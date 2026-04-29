import { getSettings } from './actions'
import SettingsClient from './settings-client'

export default async function AdminSettingsPage() {
  const result = await getSettings()
  
  if (!result.success || !result.data) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-muted-foreground">Failed to load settings</p>
        <p className="text-sm text-muted-foreground/70">{result.error}</p>
      </div>
    )
  }

  return <SettingsClient initialSettings={result.data} />
}
