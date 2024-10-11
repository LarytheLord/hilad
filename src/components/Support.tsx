import React, { useState } from 'react'
import { MessageCircle, User, Send } from 'lucide-react'

interface SupportTicket {
  id: number
  user: string
  message: string
  status: 'open' | 'closed'
}

const Support: React.FC = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>([
    { id: 1, user: 'Laryson', message: 'I need help with login issues', status: 'open' },
    { id: 2, user: 'Light', message: 'How do I reset my password?', status: 'closed' },
  ])
  const [newTicket, setNewTicket] = useState({ user: '', message: '' })

  const addTicket = () => {
    if (newTicket.user && newTicket.message) {
      setTickets([...tickets, { id: Date.now(), ...newTicket, status: 'open' }])
      setNewTicket({ user: '', message: '' })
    }
  }

  const toggleTicketStatus = (id: number) => {
    setTickets(tickets.map(ticket => 
      ticket.id === id ? { ...ticket, status: ticket.status === 'open' ? 'closed' : 'open' } : ticket
    ))
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Support Tickets</h2>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Open Tickets</h3>
          <ul className="space-y-2">
            {tickets.filter(ticket => ticket.status === 'open').map((ticket) => (
              <li key={ticket.id} className="bg-gray-100 p-2 rounded">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{ticket.user}</span>
                  <button
                    onClick={() => toggleTicketStatus(ticket.id)}
                    className="text-green-500 hover:text-green-700"
                  >
                    Close
                  </button>
                </div>
                <p className="text-gray-600">{ticket.message}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">New Ticket</h3>
          <div className="bg-gray-100 p-4 rounded">
            <div className="mb-4">
              <label htmlFor="user" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="user"
                value={newTicket.user}
                onChange={(e) => setNewTicket({ ...newTicket, user: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Your name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                id="message"
                value={newTicket.message}
                onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                rows={3}
                placeholder="Describe your issue"
              ></textarea>
            </div>
            <button
              onClick={addTicket}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Submit Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Support