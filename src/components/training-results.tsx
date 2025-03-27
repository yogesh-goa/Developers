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
    {/*if (accuracyCtx) {
      drawLineChart(
        accuracyCtx,
        results.history.map((h) => h.epoch),
        results.history.map((h) => h.accuracy),
        "Accuracy",
        "rgb(34, 197, 94)",
        "rgba(34, 197, 94, 0.2)",
      )
    }*/}

    // Draw loss chart
    {/*const lossCtx = lossChartRef.current.getContext("2d")
    if (lossCtx) {
      drawLineChart(
        lossCtx,
        results.history.map((h) => h.epoch),
        results.history.map((h) => h.loss),
        "Loss",
        "rgb(239, 68, 68)",
        "rgba(239, 68, 68, 0.2)",
      )
    }*/}
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
      <div className="grid grid-cols-1 h-full md:grid-cols-3  w-full gap-4">
        <Card className="col-span-3 h-full">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-primary mb-1">{results.accuracy.toPrecision(4)}%</div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </div>
          </CardContent>
        </Card>

        {/*<Card>
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
        </Card>*/}
      </div>

     

         
    </div>
  )
}

