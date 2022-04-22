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
    let pids = []
    let products = []

    if (data.token){
      let buff = new Buffer.from(data.token, 'base64');
      let token = buff.toString('ascii');
      pids = token.split(',')
    } else {
      data.products.forEach(p =>{
        !p.soldout && pids.push(p.pid)
      })
    }

    for (let i = 0; i < pids.length; i++){
      let res = await stripe.prices.retrieve(pids[i],{expand:['product']})
      res && products.push({...res,pid:pids[i]})
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({products}),
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
