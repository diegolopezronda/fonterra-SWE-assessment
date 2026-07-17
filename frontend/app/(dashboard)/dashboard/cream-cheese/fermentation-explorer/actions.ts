"use server"
import { auth } from "@/auth"

class CreamCheeseFormData {
  mu: number = 1
  q: number = 1
}

class Results {
  predictions: Array<any> = []
  domains: Record<string, Array<number>> = {}
}

export async function getCreamCheeseFermentationSeries(
  formData: CreamCheeseFormData
): Promise<Results | null> {
  let token = null
  if (undefined === process.env.SKIP_AUTH) {
    const session = await auth()
    token = session?.accessToken
    if (!token) {
      return null
    }
  }
  try {
    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    }

    const body = JSON.stringify({
      dataframe_records: [
        {
          y0: [10000000.0, 0.00001],
          t_start: 0.0,
          t_end: 12,
          t_steps: 1000,
        },
      ],
      params: {
        c1: 5,
        c2: 12,
        mu: formData.mu,
        q: formData.q,
      },
    })
    console.log(body)
    //const url = `${process.env.MILKO_API_URL}${process.env.CREAM_CHEESE_FERMENTATION_MODEL}`;
    const url = "http://127.0.0.1:8000/models/Cream_Cheese_Fermentation/latest"
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body,
    })
    if (!response.ok) {
      return null
    }
    const data = await response.json()
    return data
  } catch (error) {
    return null
  }
}
