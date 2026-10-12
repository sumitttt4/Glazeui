import * as React from "react"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircle2Icon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CircleAlertIcon,
  ContainerIcon,
  CopyIcon,
  DownloadIcon,
  InfoIcon,
  Loader2Icon,
  MinusIcon,
  MonitorIcon,
  MoreHorizontalIcon,
  PlusIcon,
  SearchIcon,
  ServerIcon,
  SettingsIcon,
  ShareIcon,
  ShoppingBagIcon,
  TerminalIcon,
  TrashIcon,
  UploadCloudIcon,
  ZapIcon,
  SquareIcon,
} from "lucide-react"

type Icon = React.ComponentType<React.ComponentProps<"svg">>

// Every Lucide icon the preview cards name. Listed one by one, so the page carries these and not
// the whole library; a name that is not here is drawn as a square, which is easy to spot.
const ICONS: Record<string, Icon> = {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircle2Icon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CircleAlertIcon,
  ContainerIcon,
  CopyIcon,
  DownloadIcon,
  InfoIcon,
  Loader2Icon,
  MinusIcon,
  MonitorIcon,
  MoreHorizontalIcon,
  PlusIcon,
  SearchIcon,
  ServerIcon,
  SettingsIcon,
  ShareIcon,
  ShoppingBagIcon,
  TerminalIcon,
  TrashIcon,
  UploadCloudIcon,
  ZapIcon,
}

/**
 * shadcn/ui's preview cards name each icon once per icon library. Solid Glass uses Lucide, so the
 * Lucide name is the one that is drawn and the rest are let go.
 */
export function IconPlaceholder({
  lucide,
  tabler: _tabler,
  hugeicons: _hugeicons,
  phosphor: _phosphor,
  remixicon: _remixicon,
  ...props
}: { lucide: string; tabler?: string; hugeicons?: string; phosphor?: string; remixicon?: string } & React.ComponentProps<"svg">) {
  const Found = ICONS[lucide] ?? SquareIcon
  return <Found {...props} />
}
