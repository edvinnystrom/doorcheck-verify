import { useState } from 'react';

export default function DoorCheckForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    orderId: '',
    name: '',
    photo: null,
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const timestamp = new Date().toISOString();

  const payload = {
    orderId: formData.orderId,
    name: formData.name,
    notes: formData.notes,
    timestamp: timestamp,
  };

  await fetch("https://hook.eu2.make.com/3ipx12l19cldoiffl27qlqurokjupnvj", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  setSubmitted(true);
};

  };

  if (submitted) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h2>Tack! Leveransen är registrerad.</h2>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto', background: '#fff', padding: '2rem', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <h1>DoorCheck Verifiering</h1>

      <label>Ordernummer</label>
      <input type="text" name="orderId" required onChange={handleChange} style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }} />

      <label>Mottagarens namn</label>
      <input type="text" name="name" required onChange={handleChange} style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }} />

      <label>Ladda upp bild vid leverans</label>
      <input type="file" name="photo" accept="image/*" required onChange={handleChange} style={{ marginBottom: '1rem' }} />

      <label>Kommentar (valfritt)</label>
      <textarea name="notes" rows="3" onChange={handleChange} style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}></textarea>

      <button type="submit" style={{ backgroundColor: '#0070f3', color: 'white', padding: '0.75rem 1.5rem', border: 'none', borderRadius: '5px' }}>
        Skicka in verifiering
      </button>
    </form>
  );
}
