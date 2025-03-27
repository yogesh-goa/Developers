import type { Metadata } from "next"
import ModelTrainer from "@/components/model-trainer"

export const metadata: Metadata = {
  title: "AI Model Trainer",
  description: "Train custom AI models with configurable parameters",
}

export default function HomePage() {
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">AI Model Trainer</h1>
      <p className="text-muted-foreground mb-8">Configure and train custom AI models with your own datasets</p>

      <ModelTrainer />
    </main>
  )
}

