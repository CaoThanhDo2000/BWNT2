import { createClient } from "@supabase/supabase-js";

// Thay thế 2 dòng dưới bằng thông tin bạn vừa copy bên Supabase
const supabaseUrl = "https://oleaxfpwarhhllmomxlt.supabase.co";
const supabaseKey = "sb_publishable_6Pn9rajNCmp5t_nf-XUP9Q_F8ghirjK";

export const supabase = createClient(supabaseUrl, supabaseKey);
