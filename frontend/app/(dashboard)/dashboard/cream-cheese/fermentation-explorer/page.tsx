"use client"
import { useState, useMemo } from "react"
import { LineChartForm } from "@/components/line-chart-form"
import { type ChartConfig } from "@/components/ui/chart"
import { getCreamCheeseFermentationSeries } from "./actions"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"

class CreamCheeseFormData {
  mu: number = 1
  q: number = 1
}

const chartConfig = {
  time: {
    label: "Time",
    color: "#0066FF",
  },
  X: {
    label: "X",
    color: "#FF6600",
  },
  p: {
    label: "p",
    color: "#00FF66",
  },
  pH: {
    label: "pH",
    color: "#6600FF",
  },
  sigma: {
    label: "sigma",
    color: "#FF0066",
  },
} satisfies ChartConfig

const fields = [
  {
    key: "mu",
    label: "Mu",
    min: 0.1,
    max: 2,
    default: 1,
    step: 0.01,
  },
  {
    key: "q",
    label: "Q",
    min: -20,
    max: -10,
    default: -15,
    step: 0.01,
  },
]

let defaultSeries = [
  {
    key: "time",
    stroke: "#0066FF",
    domain: [10e4, 10e8],
    stroke_width: 3,
  },
  {
    key: "X",
    stroke: "#0066FF",
    domain: [10e4, 10e8],
    stroke_width: 3,
  },
  {
    key: "p",
    stroke: "#FF6600",
    domain: [10e4, 10e8],
    stroke_width: 2,
  },
  {
    key: "pH",
    stroke: "#FF6600",
    domain: [10e4, 10e8],
    stroke_width: 3,
  },
  {
    key: "sigma",
    stroke: "#FF6600",
    domain: [10e4, 10e8],
    stroke_width: 2,
  },
]

class Results {
  predictions: Array<any> = []
  domains: Record<string, Array<number>> = {}
}

export default function Page() {
  const [values, setValues] = useState(
    () =>
      Object.fromEntries(fields.map((f) => [f.key, f.default])) as Record<
        string,
        number
      >
  )
  const [data, setData] = useState<Results | null>(null)
  const series = useMemo(() => {
    let s = JSON.parse(JSON.stringify(defaultSeries))
    if (data == null) {
      return s
    }
    console.log(data)
    s.forEach((e: any, i: number) => {
      try {
        const k = e.key as keyof typeof data.domains
        s[i].domain[0] = data.domains[k][0]
        s[i].domain[1] = data.domains[k][1]
      } catch (z) {
        //
      }
    })
    return s
  }, [data])

  const handleSubmit = async (values: Record<string, number>) => {
    const data = await getCreamCheeseFermentationSeries({
      q: values.q,
      mu: values.mu,
    })
    console.log(data)
    if (data == null) {
      toast.error("Couldn't get the result. Please try later.")
    } else {
      setData(data)
    }
  }

  return (
    <>
      <LineChartForm
        title="Cream cheese fermentation explorer"
        description=""
        data={data ? data?.predictions : null}
        chartConfig={chartConfig}
        series={series}
        fields={fields}
        values={values}
        setValues={setValues}
        onSubmit={handleSubmit}
      />
      <Toaster />
    </>
  )
}
