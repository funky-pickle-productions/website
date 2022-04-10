const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
  };


exports.handler = async (event, context) => {
  // CORS
  if (event.httpMethod === "OPTIONS") return {statusCode: 200,headers,};

  try {

    let eventData = JSON.parse(event.body)
    let items = []

    for (let i = 0; i < eventData.items.length; i++){
      let res = await stripe.prices.retrieve(eventData.items[i],{expand:['product']})
      res && items.push(res)
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(items), 
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
