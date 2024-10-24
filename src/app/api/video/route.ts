import { auth } from "@clerk/nextjs/server";
import { type NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

// Instantiate Replicate (without API token initialization in the constructor)
const replicate = new Replicate();

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized.", { status: 401 });

    const body = await req.json();
    const { prompt } = body;
    if (!prompt) return new NextResponse("Prompt is required.", { status: 400 });

    console.log("Prompt received:", prompt);

    // Define input object with prompt
    const input = { prompt_b: prompt };

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial has expired. Please upgrade to a paid plan.", { status: 403 });
    

  }

    // Run the model with the specific version provided
    const response = await replicate.run(
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      { input }
    );

    console.log("Replicate API response:", response);

    if(!isPro){
    await increaseApiLimit();
    }
    return NextResponse.json(response, { status: 200 });
  } catch (error: unknown) {
    console.error("[VIDEO_ERROR]: ", error);
    return new NextResponse("Internal server error.", { status: 500 });
  }
}
