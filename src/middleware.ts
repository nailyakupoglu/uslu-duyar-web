// next-intl middleware — locale algılama + yönlendirme.
// matcher: api, _next, _vercel, /media (foto/video) ve uzantılı dosyalar hariç tutulur.
import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|_vercel|media|.*\\..*).*)"]
};
