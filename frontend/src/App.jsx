import React, { useState, useEffect } from 'react'
import './App.css'

const subjects = [
  { code: 'ANN', name: 'Artificial Neural Networks' },
  { code: 'CNT', name: 'Computer Networks' },
  { code: 'DAA', name: 'Design & Analysis of Algorithms' },
  { code: 'CC', name: 'Cloud Computing' }
]

export default function App() {
  const [activeTab, setActiveTab] = useState('add')
  const [form, setForm] = useState({
    studentName: '', rollNo: '',
    annMse: '', annEse: '',
    cntMse: '', cntEse: '',
    daaMse: '', daaEse: '',
    ccMse: '', ccEse: ''
  })
  const [result, setResult] = useState(null)
  const [allResults, setAllResults] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (activeTab === 'view') {
      fetch('http://localhost:8080/api/results/all')
        .then(res => res.json())
        .then(data => setAllResults(data))
    }
  }, [activeTab])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const res = await fetch('http://localhost:8080/api/results/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    const data = await res.json()
    setResult(data)
    setForm({
      studentName: '', rollNo: '',
      annMse: '', annEse: '',
      cntMse: '', cntEse: '',
      daaMse: '', daaEse: '',
      ccMse: '', ccEse: ''
    })
    setLoading(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: isNaN(value) ? value : Number(value) }))
  }

  return (
    <div className="app-container">
      <h1 className="app-title">VIT Results Portal</h1>

      <div className="tabs">
        <button className={activeTab === 'add' ? 'tab active' : 'tab'} onClick={() => setActiveTab('add')}>
          Add Result
        </button>
        <button className={activeTab === 'view' ? 'tab active' : 'tab'} onClick={() => setActiveTab('view')}>
          View All Results
        </button>
      </div>

      {activeTab === 'add' ? (
        <div className="card">
          <h2>Enter Student Results</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input type="text" name="studentName" value={form.studentName} onChange={handleChange} placeholder="Student Name" required />
              <input type="text" name="rollNo" value={form.rollNo} onChange={handleChange} placeholder="Roll Number" required />
            </div>

            {subjects.map((sub) => {
              const mseKey = sub.code.toLowerCase() + 'Mse'
              const eseKey = sub.code.toLowerCase() + 'Ese'
              return (
                <div key={sub.code} className="form-row">
                  <label>{sub.code} - {sub.name}</label>
                  <input type="number" name={mseKey} value={form[mseKey]} onChange={handleChange} placeholder="MSE (0-30)" min="0" max="30" step="0.01" />
                  <input type="number" name={eseKey} value={form[eseKey]} onChange={handleChange} placeholder="ESE (0-70)" min="0" max="70" step="0.01" />
                </div>
              )
            })}

            <button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Result'}
            </button>
          </form>

          {result && (
            <div className="result-card">
              <h3>{result.studentName} - {result.rollNo}</h3>
              <div className="subjects">
                <div className="subject"><span>ANN:</span><span>{result.annTotal.toFixed(2)}</span></div>
                <div className="subject"><span>CNT:</span><span>{result.cntTotal.toFixed(2)}</span></div>
                <div className="subject"><span>DAA:</span><span>{result.daaTotal.toFixed(2)}</span></div>
                <div className="subject"><span>CC:</span><span>{result.ccTotal.toFixed(2)}</span></div>
              </div>
              <div className="total"><strong>Total: {result.totalMarks.toFixed(2)} / 400</strong></div>
            </div>
          )}
        </div>
      ) : (
        <div className="card">
          <h2>All Student Results</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Roll No</th>
                  <th>ANN</th>
                  <th>CNT</th>
                  <th>DAA</th>
                  <th>CC</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {allResults.map((r) => (
                  <tr key={r.id}>
                    <td>{r.studentName}</td>
                    <td>{r.rollNo}</td>
                    <td>{r.annTotal.toFixed(2)}</td>
                    <td>{r.cntTotal.toFixed(2)}</td>
                    <td>{r.daaTotal.toFixed(2)}</td>
                    <td>{r.ccTotal.toFixed(2)}</td>
                    <td><strong>{r.totalMarks.toFixed(2)}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
