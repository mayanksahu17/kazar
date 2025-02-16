'use client';

import React, { useState, useRef, useEffect } from 'react';
import Groq from 'groq-sdk';
import ReactMarkdown from 'react-markdown';
import { Send, GraduationCap, User, Loader2, Link as LinkIcon, Github, Globe } from 'lucide-react';
import Link from 'next/link';

const groq = new Groq({
    apiKey: "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",dangerouslyAllowBrowser: true
});

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

interface SubmissionForm {
  gitLink?: string;
  liveLink?: string;
  additionalNotes?: string;
}

export default function AssignmentPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [submission, setSubmission] = useState<SubmissionForm>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `You are an Assignment Generation Agent for professors, focused on creating practical, real-world assignments for students. Your tasks include:

            1. Creating unique, industry-relevant assignments that help students build portfolio-worthy projects
            2. Specifying clear requirements and acceptance criteria
            3. Providing detailed technical specifications
            4. Setting appropriate difficulty levels and time estimates
            5. Defining submission requirements (Git repository, live demo, etc.)
            6. Reviewing submitted work and providing constructive feedback

            When generating assignments:
            - Focus on real-world scenarios and practical applications
            - Include clear learning objectives
            - Specify required technologies and tools
            - Provide example solutions or approaches
            - Define clear evaluation criteria
            
            When reviewing submissions:
            - Check if all requirements are met
            - Provide specific feedback on code quality
            - Suggest improvements
            - Highlight good practices used
            
            Be specific, thorough, and professional in your responses.`
          },
          ...messages.map(msg => ({ role: msg.role, content: msg.content })),
          { role: 'user', content: userMessage }
        ],
        model: 'mixtral-8x7b-32768',
        temperature: 0.7,
        max_tokens: 1024,
      });

      const assistantMessage = completion.choices[0]?.message?.content || 'Sorry, I could not process your request.';
      setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
      
      // Show submission form if the message contains review request
      if (userMessage.toLowerCase().includes('submit') || userMessage.toLowerCase().includes('review')) {
        setShowSubmissionForm(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, there was an error processing your request.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmissionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!submission.gitLink && !submission.liveLink) return;

    const submissionMessage = `Please review my assignment submission:
    ${submission.gitLink ? `\nGitHub Repository: ${submission.gitLink}` : ''}
    ${submission.liveLink ? `\nLive Demo: ${submission.liveLink}` : ''}
    ${submission.additionalNotes ? `\nAdditional Notes: ${submission.additionalNotes}` : ''}`;

    setInput(submissionMessage);
    setShowSubmissionForm(false);
    setSubmission({});
    await handleSubmit(e);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex items-center justify-between p-4 border-b bg-white">
        <div className="flex items-center space-x-2">
          <GraduationCap className="w-6 h-6 text-indigo-600" />
          <h1 className="text-xl font-semibold text-gray-800">Assignment Agent</h1>
        </div>
        <Link href="/" className="text-gray-600 hover:text-gray-800">
          Switch to Mentor
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-10">
            <GraduationCap className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Welcome to Assignment Agent!</h2>
            <p className="text-gray-600 max-w-md mx-auto">
              I can help professors create practical, real-world assignments and review student submissions. 
              What would you like to do today?
            </p>
            <div className="mt-6 space-y-2 text-sm text-gray-600">
              <p>Try asking:</p>
              <ul className="space-y-1">
                <li>"Generate a web development assignment for advanced students"</li>
                <li>"Create a machine learning project that solves a real business problem"</li>
                <li>"Review my assignment submission" (I'll help you submit links)</li>
                )
              </ul>
            </div>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === 'assistant' ? 'justify-start' : 'justify-end'
            }`}
          >
            <div
              className={`flex space-x-2 max-w-[80%] ${
                message.role === 'assistant'
                  ? 'bg-white'
                  : 'bg-indigo-600 text-white'
              } rounded-lg p-4 shadow-sm`}
            >
              {message.role === 'assistant' && (
                <GraduationCap className="w-6 h-6 flex-shrink-0" />
              )}
              {message.role === 'user' && (
                <User className="w-6 h-6 flex-shrink-0" />
              )}
              <div className="prose max-w-none">
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {showSubmissionForm ? (
        <form onSubmit={handleSubmissionSubmit} className="p-4 border-t bg-white space-y-4">
          <div className="space-y-4">
            <div>
              <label htmlFor="gitLink" className="block text-sm font-medium text-gray-700">
                GitHub Repository URL
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Github className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="url"
                  id="gitLink"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="https://github.com/username/repo"
                  value={submission.gitLink || ''}
                  onChange={(e) => setSubmission(prev => ({ ...prev, gitLink: e.target.value }))}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="liveLink" className="block text-sm font-medium text-gray-700">
                Live Demo URL
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Globe className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="url"
                  id="liveLink"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="https://your-demo-site.com"
                  value={submission.liveLink || ''}
                  onChange={(e) => setSubmission(prev => ({ ...prev, liveLink: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                Additional Notes
              </label>
              <textarea
                id="notes"
                rows={3}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                placeholder="Any additional information about your submission..."
                value={submission.additionalNotes || ''}
                onChange={(e) => setSubmission(prev => ({ ...prev, additionalNotes: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowSubmissionForm(false)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!submission.gitLink && !submission.liveLink}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit for Review
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
          <div className="flex space-x-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for an assignment or submit your work for review..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}