import express from "express";
import type { Application } from "express";

export function createServer():Application {
  const app = express()
  
  app.get('/', (_, res) => {
    res.json({message:'im running bro..'})
  })
  
  
  return app
}



