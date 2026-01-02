"use client";

import { useState } from "react";
import ResponseGenerator from "@/components/ResponseGenerator";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Fountain Response Generator
          </h1>
          <p className="text-gray-600">
            Paste a patient message to generate an empathetic, compliant response
            with internal workflow guidance.
          </p>
        </div>
        <ResponseGenerator />
      </div>
    </main>
  );
}

