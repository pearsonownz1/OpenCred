import OpenAI from "openai";
import { openaiApiKey } from "../config";

const openai = new OpenAI({ apiKey: openaiApiKey });

export default openai;