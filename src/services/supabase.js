import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://olejyflngkzmfrpwzgoq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sZWp5ZmxuZ2t6bWZycHd6Z29xIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAzNTI2MTUsImV4cCI6MjAwNTkyODYxNX0.tTwPqvVLsy6te8_1hghiIXzFglBUcv0b3svkdhUK4oU";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
