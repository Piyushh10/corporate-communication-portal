
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ShieldCheck, MessageCircle, FileText, Users, Calendar } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 to-background">
      <header className="sticky top-0 z-10 w-full backdrop-blur-sm border-b bg-background/80">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold">SecureComm</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium hover:text-primary">Features</a>
            <a href="#security" className="text-sm font-medium hover:text-primary">Security</a>
            <a href="#about" className="text-sm font-medium hover:text-primary">About</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => navigate('/login')}>Sign In</Button>
            <Button onClick={() => navigate('/login')}>Get Started</Button>
          </div>
        </div>
      </header>

      <section className="container py-24 md:py-32 lg:py-40">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Secure Corporate Communications
            </h1>
            <p className="mt-4 text-xl text-muted-foreground">
              Enterprise-grade encrypted messaging, file sharing, and collaboration for teams that value security and compliance.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" onClick={() => navigate('/login')}>
                Get Started
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative mx-auto aspect-video max-w-xl rounded-xl bg-gradient-to-br from-primary/20 via-secondary/20 to-muted/20 shadow-xl">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <ShieldCheck className="h-16 w-16 text-primary" />
                <span className="text-xl font-medium">SecureComm Portal</span>
                <p className="text-muted-foreground">End-to-end encrypted corporate communication</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="bg-secondary/50 py-16 md:py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Features</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Everything your team needs for secure and compliant corporate communications
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card shadow-sm">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MessageCircle className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Secure Messaging</h3>
              <p className="text-muted-foreground">End-to-end encrypted messaging for teams and individuals</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card shadow-sm">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <FileText className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Document Sharing</h3>
              <p className="text-muted-foreground">Securely share and collaborate on documents with audit trails</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card shadow-sm">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Team Channels</h3>
              <p className="text-muted-foreground">Organized channels for different teams and departments</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card shadow-sm">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Calendar className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Calendar</h3>
              <p className="text-muted-foreground">Schedule and manage meetings with secure event details</p>
            </div>
          </div>
        </div>
      </section>

      <section id="security" className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Enterprise-Grade Security</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Your data and communications are protected with military-grade encryption, comprehensive audit trails, and compliance with major regulations.
            </p>
            
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-medium">End-to-End Encryption</h3>
                <p className="text-sm text-muted-foreground mt-1">Messages are encrypted on your device</p>
              </div>
              
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-medium">Compliance Tracking</h3>
                <p className="text-sm text-muted-foreground mt-1">Meet regulatory requirements</p>
              </div>
              
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-medium">Access Controls</h3>
                <p className="text-sm text-muted-foreground mt-1">Role-based permissions system</p>
              </div>
            </div>
            
            <Button className="mt-8" onClick={() => navigate('/login')}>
              Start Secure Communications
            </Button>
          </div>
        </div>
      </section>

      <section id="about" className="bg-secondary/50 py-16 md:py-20">
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">About SecureComm</h2>
          <p className="text-lg text-muted-foreground">
            SecureComm helps organizations maintain secure, compliant communications across distributed teams. Our platform combines cutting-edge encryption technology with a user-friendly interface designed for modern workforces.
          </p>
        </div>
      </section>

      <footer className="bg-muted/30 py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <ShieldCheck className="h-6 w-6 text-primary mr-2" />
              <span className="font-semibold">SecureComm</span>
            </div>
            
            <div className="flex gap-8">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Contact</a>
            </div>
          </div>
          
          <div className="mt-8 text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} SecureComm. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
