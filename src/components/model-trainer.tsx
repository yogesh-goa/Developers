"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, FileUp, Play } from "lucide-react"
import ModelConfigForm from "./model-config-form"
import TrainingResults from "./training-results"

export default function ModelTrainer() {
  const [isTraining, setIsTraining] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentEpoch, setCurrentEpoch] = useState(0)
  const [totalEpochs, setTotalEpochs] = useState(10)
  const [modelConfig, setModelConfig] = useState({
    modelType: "regression",
    epochs: 10,
    learningRate: 0.001,
    batchSize: 32,
    validationSplit: 0.2,
  })
  const [dataset, setDataset] = useState<File | null>(null)
  const [results, setResults] = useState<any>(null)

  const handleStartTraining = async () => {
    if (!dataset) {
      alert("Please upload a dataset first")
      return
    }

    setIsTraining(true)
    setProgress(0)
    setCurrentEpoch(0)
    setResults(null)

    const file = dataset;
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("model_type", "classification");
    formData.append("threshold_accuracy", "75.0");

    try {
        const response = await fetch("/api/train", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        console.log("Response:", data);
        setResults({accuracy: data.accuracy})
    } catch (error) {
        console.error("Upload error:", error);
    }
  }

  const handleConfigChange = (config: any) => {
    setModelConfig(config)
    setTotalEpochs(config.epochs)
  }

  const handleDatasetUpload = (file: File) => {
    setDataset(file)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Configuration Panel */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Model Configuration</h2>
        <Separator className="mb-6" />

        <ModelConfigForm
          config={modelConfig}
          onConfigChange={handleConfigChange}
          onDatasetUpload={handleDatasetUpload}
          disabled={isTraining}
        />

        <div className="mt-8">
          {dataset && (
            <div className="flex items-center mb-4 p-2 bg-muted rounded-md">
              <FileUp className="mr-2 h-4 w-4" />
              <span className="text-sm font-medium">{dataset.name}</span>
              <Badge variant="outline" className="ml-auto">
                {(dataset.size / (1024 * 1024)).toFixed(2)} MB
              </Badge>
            </div>
          )}

          {isTraining ? (
            <div className="space-y-4">
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>
                  Epoch {currentEpoch}/{totalEpochs}
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
            </div>
          ) : (
            <Button className="w-full" size="lg" onClick={handleStartTraining} disabled={!dataset}>
              <Play className="mr-2 h-4 w-4" /> Start Training
            </Button>
          )}
        </div>
      </Card>

      {/* Results Panel */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Training Results</h2>
        <Separator className="mb-6" />

        {results ? (
          <TrainingResults results={results} />
        ) : (
          <div className="flex flex-col items-center justify-center h-[400px] text-center">
            {isTraining ? (
              <>
                <div className="animate-pulse mb-4">
                  <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                </div>
                <h3 className="text-lg font-medium mb-2">Training in progress...</h3>
                <p className="text-muted-foreground">This may take a few minutes depending on your configuration</p>
              </>
            ) : (
              <>
                <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No training data yet</h3>
                <p className="text-muted-foreground">
                  Configure your model parameters and start training to see results
                </p>
              </>
            )}
          </div>
        )}
      </Card>
    </div>
  )
}

