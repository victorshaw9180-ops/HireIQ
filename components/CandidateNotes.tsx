"use client";

import { useEffect, useState } from "react";

type Note = {
  id: string;
  recruiterName: string;
  content: string;
  createdAt: string;
};

type Props = {
  applicationId: string;
};

export default function CandidateNotes({
  applicationId,
}: Props) {

  const [notes, setNotes] = useState<Note[]>([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchNotes() {

    try {

      const res = await fetch(
        `/api/applications/${applicationId}/notes`
      );

      const data = await res.json();

      if (Array.isArray(data)) {
        setNotes(data);
      }

    } catch (error) {
      console.error("FETCH NOTES ERROR:", error);
    }
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  async function addNote() {

    if (!content.trim()) return;

    try {

      setLoading(true);

      const res = await fetch(
        `/api/applications/${applicationId}/notes`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            content,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to add note");
      }

      setContent("");

      await fetchNotes();

    } catch (error) {

      console.error("ADD NOTE ERROR:", error);

    } finally {

      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

      <h2 className="mb-4 text-lg font-bold text-white">
        Candidate Notes
      </h2>

      <div className="mb-5 flex gap-3">

        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add recruiter note..."
          className="flex-1 rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none"
        />

        <button
          onClick={addNote}
          disabled={loading}
          className="rounded-lg bg-violet-600 px-4 py-3 text-sm font-semibold text-white hover:bg-violet-500 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Note"}
        </button>

      </div>

      <div className="flex flex-col gap-3">

        {notes.length === 0 ? (

          <div className="text-sm text-slate-400">
            No notes yet.
          </div>

        ) : (

          notes.map((note) => (

            <div
              key={note.id}
              className="rounded-xl border border-slate-800 bg-slate-950 p-4"
            >

              <div className="mb-2 flex items-center justify-between">

                <span className="text-xs font-semibold text-violet-400">
                  {note.recruiterName}
                </span>

                <span className="text-xs text-slate-500">
                  {new Date(note.createdAt).toLocaleString()}
                </span>

              </div>

              <p className="text-sm text-slate-200">
                {note.content}
              </p>

            </div>
          ))
        )}

      </div>

    </div>
  );
}