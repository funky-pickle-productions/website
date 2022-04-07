const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
  };


exports.handler = async (event, context) => {
  // CORS
  if (event.httpMethod === "OPTIONS") return {statusCode: 200,headers,};

  try {
    
    let data = JSON.parse(event.body)
    let res = await stripe.prices.retrieve(data.pid,{expand:['product']})

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(res),
    };

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
