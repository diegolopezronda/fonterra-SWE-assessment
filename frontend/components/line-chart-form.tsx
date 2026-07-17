"use client"
import { Slider } from "@/components/ui/slider"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import { FlaskConicalIcon } from "lucide-react"

class ChartField {
  key: string = ""
  label: string = ""
  min: number = 0
  max: number = 10
  default: number = 5
  step: number = 0.01
}

class ChartSeries {
  key: string = ""
  domain: Array<number> = [0, 10]
  stroke_width: number = 2
}

export function LineChartForm({
  title,
  description,
  chartConfig,
  data,
  series,
  fields,
  values,
  setValues,
  onSubmit,
}: {
  title: string
  description: string
  chartConfig: ChartConfig
  data: Array<Object> | null
  series: Array<ChartSeries>
  fields: Array<ChartField>
  values: Record<string, number>
  setValues: React.Dispatch<React.SetStateAction<Record<string, number>>>
  onSubmit: (values: Record<string, number>) => void
}) {
  return (
    <>
      <Card className="py-6">
        <CardHeader className="flex flex-col items-stretch border-b px-6">
          <div className="flex flex-1 flex-col justify-center gap-1">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex gap-6 p-6 h-100">
          <form
            className="flex shrink-0 flex-col gap-6 h-full pb-10"
            onSubmit={(e) => {
              e.preventDefault()
              onSubmit(values)
            }}
          >
            <FieldGroup className="flex h-full shrink-0 flex-row justify-center gap-6">
              {fields.map((v) => {
                return (
                  <Field key={v.key} className="flex w-5 flex-col items-center">
                    <FieldLabel className="justify-center" htmlFor={v.key}>
                      {v.label}
                    </FieldLabel>
                    <span className="w-full justify-center text-sm text-muted-foreground">
                      {values[v.key]}
                    </span>
                    <Slider
                      name={v.key}
                      defaultValue={[v.default]}
                      min={v.min}
                      max={v.max}
                      step={v.step}
                      orientation="vertical"
                      value={[values[v.key]]}
                      onValueChange={(value) => {
                        const nextValue = Array.isArray(value)
                          ? value[0]
                          : value
                        setValues((prev) => ({
                          ...prev,
                          [v.key]: nextValue,
                        }))
                      }}
                    />
                  </Field>
                )
              })}
            </FieldGroup>
            <Button type="submit" className="w-full">
              Show curve
            </Button>
          </form>
          <div className="h-full min-w-0 flex-1">
            {!data && (
              <div className="flex h-full w-full flex-col items-center justify-center">
                <FlaskConicalIcon className="h-16 w-16 stroke-blue-700 pb-4" />
                <h3 className="text-xl">
                  Please select a <i>Mu</i> and <i>Q</i> value, and then press{" "}
                  <b>Show curve</b> to start.
                </h3>
              </div>
            )}
            {data && (
              <ChartContainer config={chartConfig} className="h-full w-full">
                <LineChart accessibilityLayer data={data} height={60}>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <CartesianGrid vertical={false} horizontal={true} />
                  <XAxis
                    dataKey={series[0].key}
                    type="number"
                    domain={series[0].domain}
                    tickCount={series[0].domain[1] - series[0].domain[0]}
                  />
                  {series.slice(1).map((v, i) => {
                    return (
                      <div key={v.key}>
                        <YAxis
                          yAxisId={v.key + "_axis"}
                          type="number"
                          domain={v.domain}
                          orientation={i % 2 ? "left" : "right"}
                          tick={{ fill: chartConfig[v.key].color }}
                          width={100}
                          tickFormatter={(value) => {
                            if (value === 0) return "0"
                            const exp = Math.floor(Math.log10(Math.abs(value)))
                            const coeff = value / Math.pow(10, exp)
                            return Math.abs(coeff - 1) < 1e-10
                              ? `10e${exp}`
                              : `${coeff.toFixed(2)}×10e${exp}`
                          }}
                        />
                        <Line
                          yAxisId={v.key + "_axis"}
                          dataKey={v.key}
                          strokeWidth={v.stroke_width}
                          dot={false}
                          stroke={chartConfig[v.key].color}
                        />
                      </div>
                    )
                  })}
                </LineChart>
              </ChartContainer>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
