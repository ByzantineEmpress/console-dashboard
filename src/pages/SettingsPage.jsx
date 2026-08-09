import React, { useState } from 'react'
import { Folder, ExternalLink, Save, ArrowRight, Check, AlertCircle } from 'lucide-react'
import { useConfig } from '../hooks/useConfig'

function SettingsPage() {
  const { settings, updateSetting } = useConfig()

  const paths = [
    { key: 'fatXplorerPath', label: 'FatXplorer', icon: 'Folder' },
    { key: 'jRunnerPath', label: 'J-Runner', icon: 'Folder' },
    { key: 'zadigPath', label: 'Zadig', icon: 'Folder' },
    { key: 'ftpPath', label: 'FTP Client', icon: 'ExternalLink' },
  ]

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-4">Settings</h2>

      {settings.firstRunDone ? (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Tool Paths</h3>
            {paths.map(p => (
              <div key={p.key} className="mb-3">
                <label className="text-sm text-gray-300 block mb-1">{p.label}</label>
                <div className="flex gap-2">
                  <input value={settings[p.key] || ''} onChange={e => updateSetting(p.key, e.target.value)}
                    className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600" placeholder="C:\\path\\to\\..." />
                  <button onClick={() => {
                    const path = prompt(`Choose ${p.label} executable:`)
                    if (path) updateSetting(p.key, path)
                  }} className="bg-cyan-500 text-black px-3 py-2 rounded-lg text-sm font-medium hover:bg-cyan-400">
                    Browse
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Data Paths</h3>
            <div className="flex gap-2">
              <button onClick={() => {
                const path = prompt('Enter your save files directory:')
                if (path) updateSetting('savePath', path)
              }} className="bg-cyan-500 text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-cyan-400">
                Browse Save Files
              </button>
              <button onClick={() => {
                const path = prompt('Enter modding directory:')
                if (path) updateSetting('modPath', path)
              }} className="bg-cyan-500 text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-cyan-400">
                Browse Mods
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-md space-y-6">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Welcome! 👋</h3>
            <p className="text-gray-400 text-sm mb-4">This is your first time. Let's configure the paths to your local tools.</p>
            
            {paths.map(p => (
              <div key={p.key} className="mb-3">
                <label className="text-sm text-gray-300 block mb-1">{p.label}</label>
                <div className="flex gap-2">
                  <input value={settings[p.key] || ''} onChange={e => updateSetting(p.key, e.target.value)}
                    className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600" placeholder="C:\\path\\to\\..." />
                  <button onClick={() => {
                    const path = prompt(`Choose ${p.label} executable:`)
                    if (path) updateSetting(p.key, path)
                  }} className="bg-cyan-500 text-black px-3 py-2 rounded-lg text-sm font-medium hover:bg-cyan-400">
                    Browse
                  </button>
                </div>
              </div>
            ))}

            <button onClick={() => {
              const hasAllPaths = paths.every(p => settings[p.key])
              if (hasAllPaths) {
                updateSetting('firstRunDone', true)
                alert('Setup complete! You can now use all your tools.')
              } else {
                alert('Please fill in all tool paths first.')
              }
            }} className="w-full mt-6 bg-cyan-500 text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-cyan-400">
              Finish Setup →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SettingsPage
