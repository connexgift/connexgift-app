import Head from 'next/head';
import React from 'react';
import { useState } from 'react';
import styles from './index.module.css';

export default function Home() {
  const [gender, setGender] = useState('man');
  const [age, setAge] = useState(30);
  const [occasion, setOccasion] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState('');

  async function onSubmit(event) {
    event.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);
    setResult('');
    const response = await fetch('/api/generate-gifts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ occasion, gender, age, hobbies }),
    });
    const data = await response.json();
    setResult(data.result.replaceAll('\n', '<br />'));
    setLoading(false);
  }

  return (
    <div>
      <Head>
        <title>ConnexGift</title>
        <link rel="icon" href="/gift_pack.png" />
      </Head>

      <main className={styles.main}>
        <p className={styles.header_text}>Find the perfect <img src="/gift_pack.png" className={styles.header_logo}/> for friends family <br/> and colleagues on any occasion.</p>
        
        <form onSubmit={onSubmit}>
          <div>
            <label>Gender</label>
            <select
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className={styles.input1_2}
            >
              <option value="man">Man</option>
              <option value="woman">Woman</option>
              <option value="other">Other</option>
            </select>

            <label>Age</label>
            <input
              type="number"
              min={1}
              max={99}
              name="age"
              placeholder="Saisir l'âge"
              value={age}
              onChange={(e) => setAge(Number.parseInt(e.target.value))}
              className={styles.input1_2}
            />
          </div>
          <div className={styles.input3}>
            <label>Type d'occasion</label>
            <input
              type="text"
              name="occasion"
              placeholder="Saisir le type d'évènement"
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              className={styles.input3}
              required
            />
          </div>
          <div className={styles.input4}>
            <label>Ses hobbies</label>
            <input
              type="text"
              name="hobbies"
              placeholder="Saisir ses hobbies"
              value={hobbies}
              onChange={(e) => setHobbies(e.target.value)}
              className={styles.input4}
              required
            />
          </div>
          <input type="submit" value="Suggest the perfect gift" />
        </form>
        {loading && (
          <div>
            <h3>Recherche des meilleurs idées de cadeaux en cours 🎁 💡</h3>
            <img src="/gift_pack.png" className={styles.loading} />
          </div>
        )}
        <div
          className={styles.result}
          dangerouslySetInnerHTML={{ __html: result }}
        />
      </main>
    </div>
  );
}