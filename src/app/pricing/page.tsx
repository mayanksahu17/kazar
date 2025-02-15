import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

const basicPlan = {
  name: "Basic",
  price: "$19.99",
  features: ["Post Opportunities", "Search Students", "Access Dashboard"],
}

export default function PricingPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <Link href="/" className="flex items-center text-blue-600 mb-6">
        <ArrowLeft className="mr-2" size={20} />
        Back
      </Link>
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Choose Your Plan</h1>
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-600">{basicPlan.name}</CardTitle>
            <CardDescription>{basicPlan.price}/month</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              {basicPlan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Link href="/payment" className="w-full">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Proceed to Payment</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

