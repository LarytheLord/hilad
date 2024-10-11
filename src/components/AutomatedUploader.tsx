import React, { useState } from 'react'
import { RefreshCw } from 'lucide-react'

const AutomatedUploader: React.FC = () => {
  const [isAutomated, setIsAutomated] = useState(false)
  const [interval, setInterval] = useState(60)

  const toggleAutomation = () => {
    setIsAutomated(!isAutomated)
    if (!isAutomated) {
      // Here you would implement the actual automation logic
      console.log(`Starting automated uploads every ${interval} minutes`)
    } else {
      console.log('Stopping automated uploads')
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Automated Uploads</h2>
      <div className="flex items-center space-x-4 mb-4">
        <label htmlFor="interval" className="font-semibold">
          Upload Interval (minutes):
        </label>
        <input
          type="number"
          id="interval"
          value={interval}
          onChange={(e) => setInterval(parseInt(e.target.value))}
          className="border rounded px-2 py-1 w-20"
          min="1"
        />
      </div>
      <button
        onClick={toggleAutomation}
        className={`flex items-center px-4 py-2 rounded ${
          isAutomated ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
        }`}
      >
        <RefreshCw className="mr-2" />
        {isAutomated ? 'Stop Automation' : 'Start Automation'}
      </button>
      {isAutomated && (
        <p className="mt-4 text-sm text-gray-600">
          Automated uploads are running. New documents will be uploaded every {interval} minutes.
        </p>
      )}
    </div>
  )
}

export default AutomatedUploader