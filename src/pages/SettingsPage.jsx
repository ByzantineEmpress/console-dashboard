import React, { useState } from 'react'
import { Settings as SettingsIcon, Folder, Save, X, ArrowRight, Check, AlertCircle } from 'lucide-react'
import { useConfig } from '../hooks/useConfig'

function SettingsPage() {
  const { firstRunDone, settings, updateSetting } = useConfig()

  if (firstRunDone) {
    return (
      <div>
        <div className="flex items-center gap-3 mb-6">
          <SettingsIcon className="w-6 h-6 text-cyan-400" />
          <h2 className="text-xl font-bold text-white">Settings</h2>
        </div>
        <p className="text-gray-400 mb-6">Tool paths configured. Edit paths below to update.</p>
        <div className="mt-4 space-y-4">
          {Object.entries(settings).forEach(([key, val]) => {
            if (key === 'firstRun') return
            const path = val.path
            return (
              <div key={key} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-white">{key}</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${path ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>{path ? 'Configured' : 'Not set'}</span>
                </div>
                <input value={path || ''} onChange={e => updateSetting(key, { path: e.target.value })} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600" placeholder={`Path for ${key}...`} />
              </div>
            )
          })}
        </div>
        <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-400" />
            <p className="text-sm text-gray-400">Add custom entries below or configure paths for tools that aren't pre-configured.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <SettingsIcon className="w-6 h-6 text-cyan-400" />
        <h2 className="text-xl font-bold text-white">Configure Tools</h2>
      </div>
      <p className="text-gray-400 mb-6">Set the local paths for your tools. These paths will be used when you click "Run" on each tool entry.</p>
      <div className="space-y-4">
        {[
          { id: 'fatxplorer', name: 'FatXplorer' },
          { id: 'jrunner', name: 'J-Runner' },
          { id: 'zadig', name: 'Zadig' },
          { id: 'ftpclient', name: 'FTP Client' },
        ].map(tool => {
          const path = settings[tool.id]?.path
          return (
            <div key={tool.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <label className="block text-sm font-medium text-white mb-1">{tool.name}</label>
              <input value={path || ''} onChange={e => updateSetting(tool.id, { path: e.target.value })} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600" placeholder={`Path to ${tool.name}...`} />
            </div>
          )
        })}
      </div>
      <div className="mt-6 flex gap-2">
        <button onClick={() => updateSetting('firstRun', { firstRunDone: true })} className="bg-cyan-500 text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-cyan-400"><ArrowRight className="w-4 h-4 inline" /> Finish Setup</button>
        <button onClick={() => updateSetting('firstRun', { firstRunDone: false })} className="bg-gray-800 text-gray-400 px-4 py-2 rounded-lg text-sm hover:text-white">Cancel</button>
      </div>
    </div>
  )
}

export default SettingsPage
