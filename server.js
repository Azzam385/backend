require('dotenv').config()

const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{

  res.send('NEXXAS AI SERVER RUNNING')

})

app.post('/chat',async(req,res)=>{

  const { message } = req.body

  try{

    const response = await fetch(

      'https://api.groq.com/openai/v1/chat/completions',

      {

        method:'POST',

        headers:{

          'Content-Type':'application/json',

          'Authorization':
          `Bearer ${process.env.GROQ_API_KEY}`

        },

        body:JSON.stringify({

          model:'llama-3.3-70b-versatile',

          messages:[

            {
              role:'system',
              content:
              'Kamu adalah AI cyber futuristik bernama NEXXAS AI.'
            },

            {
              role:'user',
              content:message
            }

          ]

        })

      }

    )

    const data = await response.json()

    res.json({

      reply:
      data.choices[0].message.content

    })

  }catch(err){

    console.log(err)

    res.json({

      reply:'Server Error'

    })

  }

})

app.listen(5000,()=>{

  console.log(
    'SERVER RUNNING ON PORT 5000'
  )

})