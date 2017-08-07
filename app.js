
const keyPublishable = pk_test_7fQwskkIwuWNEkWfcIyJZJKS
const keySecret = sk_test_SJ6aCNdbEfjzHEwiZNsJPJmF
// these are the test keys on stripe

const app = require("express")()
const stripe = require("stripe")(keySecret)

app.get("/", (req, res) =>
  res.render("index.pug", {keyPublishable}))

// always convert $ to cents total
app.post("/charge", (req, res) => {
  let amount = 500

  stripe.customers.create({
     email: req.body.stripeEmail,
    source: req.body.stripeToken
  })
  .then(customer =>
    stripe.charges.create({
      amount,
      description: "Sample Charge", // optional
         currency: "usd",
         customer: customer.id
    }))
  .then(charge => res.render("charge.pug"))
})

app.listen(4741)
