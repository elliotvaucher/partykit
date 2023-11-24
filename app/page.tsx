'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import DropDown, { VibeType } from '../components/DropDown';
import Footer from '../components/Footer';
import Github from '../components/GitHub';
import Header from '../components/Header';
import { useChat } from 'ai/react';
import confetti from 'canvas-confetti';
import ReactMarkdown from 'react-markdown';

export default function Page() {
  const [bio, setBio] = useState('');
  const [vibe, setVibe] = useState<VibeType>('Professional');
  const bioRef = useRef<null | HTMLDivElement>(null);

  const scrollToBios = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const { input, handleInputChange, handleSubmit, isLoading, messages } =
    useChat({
      body: {
        vibe,
        bio,
      },
      onResponse() {
        scrollToBios();
      },
    });

/*   const onSubmit = (e: any) => {
    setBio(input);
    handleSubmit(e);
    launchConfetti();
  }; */

  const launchConfetti = () => {
    confetti({
      angle: 90,
      spread: 45,
      particleCount: 50,
      origin: { x: 0.5, y: 0.5 }
    });
  };

  const lastMessage = messages[messages.length - 1];
  const generatedBios = lastMessage?.role === "assistant" ? lastMessage.content : null;

  const [showFullBio, setShowFullBio] = useState(false);
  const [email, setEmail] = useState('');

  // Handle the possibility of generatedBios being null
  const halfwayIndex = generatedBios ? Math.ceil(generatedBios.length / 2) : 0;
  const firstHalfBio = generatedBios ? generatedBios.substring(0, halfwayIndex) : '';
  const secondHalfBio = generatedBios ? generatedBios.substring(halfwayIndex) : '';
  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle the email submission logic here
    setShowFullBio(true); // This will display the rest of the content
  };

  const [lastInput, setLastInput] = useState('');

  const onSubmit = (e: any) => {
    setBio(input);
    setLastInput(input); // Update the lastInput state with the current input
    handleSubmit(e);
    launchConfetti();
  };

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
        <a
          className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 shadow-md transition-colors hover:bg-gray-100 mb-5"
          href="https://github.com/elliotvaucher/partykit"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
          <p>Star on GitHub</p>
        </a>
        <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
          Votre fête d'anniversaire en un clic.
        </h1>
        <p className="text-slate-500 mt-5">47,118 anniversaires organisés.</p>
        <form className="max-w-xl w-full" onSubmit={onSubmit}>
          <div className="flex mt-10 items-center space-x-3">
            <Image
              src="/1-black.png"
              width={30}
              height={30}
              alt="1 icon"
              className="mb-5 sm:mb-0"
            />
            <p className="text-left font-medium">
              Décrivez la fête que vous souhaitez organiser{' '}
              <span className="text-slate-500">
                (le nom et l'âge de votre enfant, son film préféré, sa passion, le nombre d'invités.)
              </span>
              .
            </p>
          </div>
          <textarea
            value={input}
            onChange={handleInputChange}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={
            lastInput || 'e.g. Marc a 10 ans et adore les dinosaures. Il aimerait inviter 10 amis à son anniversaire.'
            }
          />
          <div className="flex mb-5 items-center space-x-3">
            <Image src="/2-black.png" width={30} height={30} alt="1 icon" />
            <p className="text-left font-medium">Sélectionnez l'ambiance.</p>
          </div>
          <div className="block">
            <DropDown vibe={vibe} setVibe={(newVibe) => setVibe(newVibe)} />
          </div>

          {!isLoading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              type="submit"
              onClick={launchConfetti}
            >
              Générez votre fête &rarr;
            </button>
          )}
          {isLoading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              disabled
            >
              <span className="loading">
                <span style={{ backgroundColor: 'white' }} />
                <span style={{ backgroundColor: 'white' }} />
                <span style={{ backgroundColor: 'white' }} />
              </span>
            </button>
          )}
        </form>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <output className="space-y-10 my-10">
          {generatedBios && (
            <>
              <div>
                <h2
                  className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto"
                  ref={bioRef}
                >
                  Votre fête
                </h2>
              </div>
              <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border">
            <ReactMarkdown>{showFullBio ? generatedBios : firstHalfBio}</ReactMarkdown>
            {!showFullBio && (
              <form onSubmit={handleEmailSubmit} className="mt-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Entrez votre mail"
                  className="border p-2 rounded-lg"
                  required
                />
                <button type="submit" className="rainbow-button text-white rounded-lg p-2 ml-2">
                  Voir la suite
                </button>
              </form>
            )}
          </div>
        </div>
            </>
          )}
        </output>
      </main>
      <Footer />
    </div>
  );
}
