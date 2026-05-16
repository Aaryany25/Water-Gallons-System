import React from 'react'
import { ArrowRight, CheckCircle2, Truck, ShieldCheck, Clock } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '../components/ui/card'
import DotBackground from '../components/DotBackground'

function Home() {
  return (
    <>
    <DotBackground>
 <section className="relative overflow-hidden  py-12 md:py-24">
        <div className="container mx-auto px-4  gap-12 items-center">
          <div className="space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full border border-primary/20">
              <CheckCircle2 className="h-4 w-4" />
              <span className="text-sm font-semibold">Certified Pure</span>
            </div>
            <h1 className="text-[100vw] md:text-6xl font-extrabold tracking-tight leading-tight">
              Pure Hydration <br /> 
              <span className="text-primary text-5xl" >Delivered to You.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              Experience the clarity of premium filtered water. Our 20L bottles are sanitized, sealed, and delivered to your doorstep within 2 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="h-14 px-8 text-md flex rounded-xl shadow-lg shadow-primary/20 group">
                <Link to="/place-order">
                  Order Now
                </Link>
              </Button>
              {/* <Button size="lg" variant="secondary" className="h-14 px-8 text-lg rounded-xl">
                View Plans
              </Button> */}
            </div>
          </div>
          <div className="relative flex justify-center items-center">
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl -z-10 scale-90"></div>
           
          </div>
        </div>
      </section>
       <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto border-none shadow-lg">
            <CardContent className="p-8 md:p-12 text-center space-y-8">
              <h2 className="text-3xl font-bold">Track Your Hydration</h2>
              <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-inner border">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold text-primary">In Delivery</span>
                  <span className="text-sm text-muted-foreground">Arrival in 12 mins</span>
                </div>
                <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden relative">
                  <div className="h-full w-3/4 bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse"></div>
                </div>
                <div className="flex justify-between mt-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  <span>Order Placed</span>
                  <span>Dispatched</span>
                  <span className="text-primary font-bold">Arriving</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
<section className="py-24 container mx-auto px-4">
        <div className="relative p-8 md:p-16 rounded-[2.5rem] overflow-hidden bg-primary text-primary-foreground text-center">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="relative z-10 space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold">Ready for a refreshing change?</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto leading-relaxed">
              Join 10,000+ satisfied households and offices today. Get your first bottle free on subscriptions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="secondary" size="lg" className="h-14 px-10 rounded-full font-bold">
                Start Subscription
              </Button>
              <Button variant="outline" size="lg" className="h-14 px-10 rounded-full bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary">
                Quick One-Time Order
              </Button>
            </div>
          </div>
        </div>
      </section>
    </DotBackground>
       
    </>
  )
}

export default Home