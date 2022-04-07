const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
  };


exports.handler = async (event, context) => {
  // CORS
  if (event.httpMethod === "OPTIONS") return {statusCode: 200,headers};

  let data = JSON.parse(event.body)
  let amount = 0
  let paymentIntent = null

  try {

    for(let i = 0; i < data.products.length; i++){
      let product = data.products[i]
      let res = await stripe.prices.retrieve(product.id)
      amount += res.unit_amount * product.quantity
    }

    switch(data.method){


      case 'create':
        paymentIntent = await stripe.paymentIntents.create({
          currency: "usd",
          amount: amount,
          description: "Payment for goods"
        });
        return { statusCode: 200,headers,body:JSON.stringify({clientSecret:paymentIntent.client_secret,id:paymentIntent.id})};


      case 'update':

        paymentIntent = await stripe.paymentIntents.update(data.id,{amount});

        return paymentIntent
               ? { statusCode: 200,headers,body:JSON.stringify({success:true})}
               : {statusCode: 400,headers,body:JSON.stringify({success:false})};

    }


  } catch (err) {
    console.log(err);
    return {statusCode: 400,headers,body: JSON.stringify({status: err})};
  }
};
