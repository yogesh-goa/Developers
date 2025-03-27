"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, BarChart3, LineChart } from "lucide-react"

interface TrainingResultsProps {
  results: {
    accuracy: number
    loss: number
    metrics: {
      precision: number
      recall: number
      f1Score: number
    }
    history: Array<{
      epoch: number
      accuracy: number
      loss: number
    }>
  }
}

export default function TrainingResults({ results }: TrainingResultsProps) {
  const accuracyChartRef = useRef<HTMLCanvasElement>(null)
  const lossChartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!results || !accuracyChartRef.current || !lossChartRef.current) return

    // Draw accuracy chart
    const accuracyCtx = accuracyChartRef.current.getContext("2d")
    if (accuracyCtx) {
      drawLineChart(
        accuracyCtx,
        results.history.map((h) => h.epoch),
        results.history.map((h) => h.accuracy),
        "Accuracy",
        "rgb(34, 197, 94)",
        "rgba(34, 197, 94, 0.2)",
      )
    }

    // Draw loss chart
    const lossCtx = lossChartRef.current.getContext("2d")
    if (lossCtx) {
      drawLineChart(
        lossCtx,
        results.history.map((h) => h.epoch),
        results.history.map((h) => h.loss),
        "Loss",
        "rgb(239, 68, 68)",
        "rgba(239, 68, 68, 0.2)",
      )
    }
  }, [results])

  const drawLineChart = (
    ctx: CanvasRenderingContext2D,
    labels: number[],
    data: number[],
    label: string,
    lineColor: string,
    fillColor: string,
  ) => {
    // Clear canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    const padding = 40
    const chartWidth = ctx.canvas.width - padding * 2
    const chartHeight = ctx.canvas.height - padding * 2

    // Draw axes
    ctx.beginPath()
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, ctx.canvas.height - padding)
    ctx.lineTo(ctx.canvas.width - padding, ctx.canvas.height - padding)
    ctx.strokeStyle = "#e2e8f0"
    ctx.stroke()

    // Draw labels
    ctx.font = "12px sans-serif"
    ctx.fillStyle = "#64748b"
    ctx.textAlign = "center"

    // X-axis labels
    const xStep = chartWidth / (labels.length - 1)
    for (let i = 0; i < labels.length; i += Math.ceil(labels.length / 5)) {
      const x = padding + i * xStep
      ctx.fillText(labels[i].toString(), x, ctx.canvas.height - padding + 20)
    }

    // Y-axis labels
    ctx.textAlign = "right"
    const yStep = chartHeight / 4
    for (let i = 0; i <= 4; i++) {
      const y = ctx.canvas.height - padding - i * yStep
      ctx.fillText((i * 0.25).toFixed(2), padding - 10, y + 5)
    }

    // Draw title
    ctx.font = "14px sans-serif"
    ctx.fillStyle = "#0f172a"
    ctx.textAlign = "center"
    ctx.fillText(label, ctx.canvas.width / 2, padding - 15)

    // Draw data line
    ctx.beginPath()
    const getX = (i: number) => padding + i * xStep
    const getY = (value: number) => ctx.canvas.height - padding - value * chartHeight

    ctx.moveTo(getX(0), getY(data[0]))
    for (let i = 1; i < data.length; i++) {
      ctx.lineTo(getX(i), getY(data[i]))
    }

    ctx.strokeStyle = lineColor
    ctx.lineWidth = 2
    ctx.stroke()

    // Fill area under the line
    ctx.lineTo(getX(data.length - 1), ctx.canvas.height - padding)
    ctx.lineTo(getX(0), ctx.canvas.height - padding)
    ctx.closePath()
    ctx.fillStyle = fillColor
    ctx.fill()
  }

  const formatPercent = (value: number) => {
    return `${(value * 100).toFixed(2)}%`
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-primary mb-1">{formatPercent(results.accuracy)}</div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-destructive mb-1">{results.loss.toFixed(4)}</div>
              <div className="text-sm text-muted-foreground">Loss</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-amber-500 mb-1">{formatPercent(results.metrics.f1Score)}</div>
              <div className="text-sm text-muted-foreground">F1 Score</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="charts">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="charts">
            <LineChart className="h-4 w-4 mr-2" />
            Training Charts
          </TabsTrigger>
          <TabsTrigger value="metrics">
            <BarChart3 className="h-4 w-4 mr-2" />
            Detailed Metrics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="charts" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-card rounded-lg p-4 border">
              <canvas ref={accuracyChartRef} height={200} />
            </div>
            <div className="bg-card rounded-lg p-4 border">
              <canvas ref={lossChartRef} height={200} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="metrics" className="pt-4">
          <div className="bg-card rounded-lg p-6 border">
            <h3 className="text-lg font-medium mb-4">Performance Metrics</h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Accuracy</span>
                <div className="flex items-center">
                  <div className="w-32 h-2 bg-muted rounded-full mr-3">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${results.accuracy * 100}%` }} />
                  </div>
                  <span className="text-sm font-medium">{formatPercent(results.accuracy)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Precision</span>
                <div className="flex items-center">
                  <div className="w-32 h-2 bg-muted rounded-full mr-3">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${results.metrics.precision * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{formatPercent(results.metrics.precision)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Recall</span>
                <div className="flex items-center">
                  <div className="w-32 h-2 bg-muted rounded-full mr-3">
                    <div
                      className="h-full bg-purple-500 rounded-full"
                      style={{ width: `${results.metrics.recall * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{formatPercent(results.metrics.recall)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">F1 Score</span>
                <div className="flex items-center">
                  <div className="w-32 h-2 bg-muted rounded-full mr-3">
                    <div
                      className="h-full bg-amber-500 rounded-full"
                      style={{ width: `${results.metrics.f1Score * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{formatPercent(results.metrics.f1Score)}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <h4 className="text-sm font-medium mb-3">Training Summary</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Epochs</span>
                  <span className="text-sm font-medium">{results.history.length}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Final Loss</span>
                  <span className="text-sm font-medium">{results.loss.toFixed(4)}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Best Epoch</span>
                  <span className="text-sm font-medium">
                    {results.history.reduce(
                      (best, curr, i) => (curr.accuracy > results.history[best].accuracy ? i : best),
                      0,
                    ) + 1}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Training Status</span>
                  <span className="flex items-center text-sm font-medium text-green-600">
                    <CheckCircle2 className="h-3 w-3 mr-1" /> Completed
                  </span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

