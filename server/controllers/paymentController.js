import Payment from "../models/Payment.js";
import { createPaymentIntent } from "../helpers/stripeHelper.js";
import Organization from "../models/Organization.js";

import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const handleStripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);

    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        const payment = await Payment.findOne({ status: "pending", amount: paymentIntent.amount / 100 });
        if (payment) {
          payment.status = "successful";
          await payment.save();
        }
        break;
      case "payment_intent.payment_failed":
        const failedIntent = event.data.object;
        const failedPayment = await Payment.findOne({ status: "pending", amount: failedIntent.amount / 100 });
        if (failedPayment) {
          failedPayment.status = "failed";
          await failedPayment.save();
        }
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).send("Event received");
  } catch (err) {
    console.log(`Webhook Error: ${err.message}`);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
};

export const recordPayment = async (req, res) => {
    const { amount, planId, organizationId } = req.body;
    console.log(req.body);
    
    try {
      const paymentIntent = await createPaymentIntent(amount * 100);
  
      const payment = new Payment({
        amount,
        planId,
        organizationId,
        usersPurchased: req.body.usersPurchased,
        status: "pending", 
        paymentIntentId: paymentIntent.id,
      });
  
      await payment.save();
      console.log("payment made: ", payment);
    
      // Add this plan to the organization
      const organization = await Organization.findById(organizationId);
      organization.plans.push({
        planId: planId,
        usersPurchased: req.body.usersPurchased,
        paymentId: payment._id,
      });
      await organization.save();
  
      res.status(200).json({ message: "Payment intent created", clientSecret: paymentIntent.client_secret });
    } catch (error) {
      res.status(500).json({ message: "Error processing payment", error: error.message });
    }
  };

export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate("organizationId", "name");
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching payments", error: error.message });
  }
};

export const getPaymentsByOrganization = async (req, res) => {
  try {
    const { id } = req.params;

    const payments = await Payment.find({ organizationId: id });
    if (!payments.length) {
      return res.status(404).json({ message: "No payments found for this organization" });
    }

    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching payments", error: error.message });
  }
};
