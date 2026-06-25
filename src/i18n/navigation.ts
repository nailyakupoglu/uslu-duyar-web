// Locale-duyarlı navigasyon API'leri — tüm iç linkler bunları kullanır (next/link yerine).
import { createNavigation } from "next-intl/navigation";

import { routing } from "./routing";

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
