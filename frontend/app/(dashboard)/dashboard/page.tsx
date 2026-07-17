import { HandIcon } from "lucide-react"
import {
  Card,
  CardContent
} from "@/components/ui/card"

export default function Page() {

  return (
    <>
      <div className="flex h-full flex-col items-center justify-center bg-muted p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-4xl">
          <div className="flex flex-col gap-6">
            <Card className="overflow-hidden p-0">
              <CardContent className="grid p-0 md:grid-cols-2">
                <div className="flex h-80 flex-col items-center justify-center p-6">
                  <HandIcon className="h-16 w-16 stroke-emerald-700 pb-4"/>
                  <h2 className="font-600 text-2xl">Welcome</h2>
                  <h3 className="text-l">
                    Milko App
                  </h3>
                </div>
                <div className="relative hidden bg-muted md:block">
                  <img
                    src="/not-available.png"
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
