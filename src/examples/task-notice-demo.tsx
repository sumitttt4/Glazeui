import { TaskNotice } from "@/components/ui/task-notice"

export default function TaskNoticeDemo() {
  return (
    <TaskNotice
      className="w-full max-w-md"
      notices={[
        { id: "1", title: "Background task “Background reading” finished", status: "completed", note: "ran 18s" },
        { id: "2", title: "Background task “Survey of sources” failed", status: "failed", note: "ran 17s" },
        { id: "3", title: "You stopped “Rerun 19 timed-out samples”", status: "stopped", note: "ran 2m 14s" },
      ]}
    />
  )
}
