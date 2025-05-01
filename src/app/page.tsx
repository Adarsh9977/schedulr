import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <span className="text-primary">Smart</span>Schedule
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium">
              Login
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>
      
      <main className="flex-1">
        <section className="py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Optimize Your Day with AI-Powered Scheduling
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Smart Schedule helps you plan your day, track your progress, and achieve more with personalized AI recommendations.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register">
                    <Button size="lg" className="gap-1">
                      Get Started <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/features">
                    <Button size="lg" variant="outline">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto lg:mx-0 relative">
                <img
                  src="/placeholder.svg?height=550&width=450"
                  alt="Smart Schedule Dashboard Preview"
                  className="rounded-lg shadow-xl"
                  width={450}
                  height={550}
                />
              </div>
            </div>
          </div>
        </section>
        
        <section className="bg-gray-50 dark:bg-gray-900 py-16">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Daily Routines</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Track sleep, meals, and activities with ease
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
                    <path d="M2 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2" />
                    <path d="m16 11 2 2 4-4" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">AI Optimization</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Get personalized schedules based on your preferences
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Smart Chat</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Ask questions and get advice through text or voice
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2025 Smart Schedule. All rights reserved.
          </p>
          <nav className="flex gap-4 text-sm font-medium">
            <Link href="/terms" className="text-gray-500 hover:underline dark:text-gray-400">
              Terms
            </Link>
            <Link href="/privacy" className="text-gray-500 hover:underline dark:text-gray-400">
              Privacy
            </Link>
            <Link href="/contact" className="text-gray-500 hover:underline dark:text-gray-400">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}