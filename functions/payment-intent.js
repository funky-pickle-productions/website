const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
  };


exports.handler = async (event, context) => {
  // CORS
  if (event.httpMethod === "OPTIONS") return {statusCode: 200,headers};

  let data = JSON.parse(event.body)
  let paymentIntent = {}

  try {

    if (data.type == 'create'){

      let amount = 0

      for(let i = 0; i < data.products.length; i++){
        let product = data.products[i]
        let res = await stripe.prices.retrieve(product.id)
        amount += res.unit_amount * product.quantity
      }

      paymentIntent = await stripe.paymentIntents.create({
        currency: "usd",
        amount: amount,
        description: "Payment for goods",
      });

    } else if (data.type == 'cancel'){

      paymentIntent = await stripe.paymentIntents.cancel(data.id);

    }

    return { statusCode: 200,headers,body:JSON.stringify(paymentIntent)};

  } catch (err) {
    console.log(err);
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        status: err,
      }),
    };
  }
};
