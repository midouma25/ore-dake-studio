import React, { useState } from 'react';
import { Play, RotateCcw, Trash2, Edit3, X, Check, Mic } from 'lucide-react';
import { cn } from '../../../utils/classNames';
import { Button } from '../../common/Button';
import { useAIJobStore } from '../../../store/useAIJobStore';

// Mock Data representing WhisperX output with word-level timestamps
const INITIAL_TRANSCRIPT = [
  { id: 1, text: "In", start: 0.0, end: 0.2, status: "normal" },
  { id: 2, text: "the", start: 0.2, end: 0.4, status: "normal" },
  { id: 3, text: "depths", start: 0.4, end: 0.8, status: "normal" },
  { id: 4, text: "of", start: 0.8, end: 0.9, status: "normal" },
  { id: 5, text: "space,", start: 0.9, end: 1.4, status: "normal" },
  { id: 6, text: "a", start: 1.5, end: 1.6, status: "normal" },
  { id: 7, text: "lone", start: 1.6, end: 2.0, status: "normal" },
  { id: 8, text: "warrior", start: 2.0, end: 2.5, status: "normal" },
  { id: 9, text: "stands", start: 2.5, end: 3.0, status: "normal" },
  { id: 10, text: "against", start: 3.1, end: 3.5, status: "normal" },
  { id: 11, text: "the", start: 3.5, end: 3.6, status: "normal" },
  { id: 12, text: "darkness.", start: 3.6, end: 4.2, status: "normal" },
];

export const TextAudioEditor = () => {
  const [words, setWords] = useState(INITIAL_TRANSCRIPT);
  const [selectedWordIds, setSelectedWordIds] = useState([]);
  const [editingWordId, setEditingWordId] = useState(null);
  const [editInputValue, setEditInputValue] = useState("");
  
  const { startJob, isProcessing } = useAIJobStore();

  const toggleWordSelection = (id) => {
    if (editingWordId) return; // Prevent selection while editing
    setSelectedWordIds(prev => 
      prev.includes(id) ? prev.filter(wordId => wordId !== id) : [...prev, id]
    );
  };

  const clearSelection = () => {
    setSelectedWordIds([]);
    setEditingWordId(null);
  };

  const handleDeleteSelected = () => {
    setWords(prev => prev.map(word => 
      selectedWordIds.includes(word.id) ? { ...word, status: "deleted" } : word
    ));
    clearSelection();
  };

  const handleRestoreSelected = () => {
    setWords(prev => prev.map(word => 
      selectedWordIds.includes(word.id) ? { ...word, status: "normal", replacement: null } : word
    ));
    clearSelection();
  };

  const startEditing = () => {
    if (selectedWordIds.length !== 1) return; // Only allow editing one word at a time for this demo
    const wordToEdit = words.find(w => w.id === selectedWordIds[0]);
    setEditInputValue(wordToEdit.replacement || wordToEdit.text);
    setEditingWordId(wordToEdit.id);
  };

  const saveEdit = () => {
    setWords(prev => prev.map(word => 
      word.id === editingWordId 
        ? { ...word, status: "edited", replacement: editInputValue } 
        : word
    ));
    clearSelection();
  };

  const handleRegenerate = () => {
    // Determine which words need AI processing (edited ones)
    startJob({ id: `job_${Date.now()}`, type: 'text-edit', title: 'Synthesizing Edited Words (Voicebox)' });
    
    // Simulate AI Job completion
    setTimeout(() => {
      useAIJobStore.getState().completeJob();
      setWords(prev => prev.map(word => 
        word.status === "edited" ? { ...word, status: "normal", text: word.replacement } : word
      ));
    }, 3000);
  };

  return (
    <div className="flex flex-col h-full bg-bgSecondary border border-borderColor rounded-lg overflow-hidden w-full max-w-4xl mx-auto my-6">
      
      {/* Header & Main Actions */}
      <div className="flex items-center justify-between p-4 bg-bgTertiary border-b border-borderColor">
        <div className="flex items-center gap-2">
          <Edit3 className="w-5 h-5 text-accentPrimary" />
          <h2 className="font-semibold text-textPrimary">Text-Based Audio Editor</h2>
        </div>
        
        <Button 
          variant="primary" 
          size="sm" 
          icon={Mic}
          disabled={isProcessing || !words.some(w => w.status === 'edited' || w.status === 'deleted')}
          onClick={handleRegenerate}
        >
          Apply & Regenerate Audio
        </Button>
      </div>

      {/* Editing Toolbar (Visible when words are selected) */}
      <div className={cn(
        "flex items-center gap-2 px-4 bg-[#222] border-b border-borderColor transition-all duration-200 overflow-hidden",
        selectedWordIds.length > 0 ? "h-12 opacity-100" : "h-0 opacity-0 border-transparent"
      )}>
        <span className="text-xs text-accentPrimary font-medium mr-4">
          {selectedWordIds.length} word(s) selected
        </span>
        
        {editingWordId ? (
          <div className="flex items-center gap-2 w-full max-w-sm">
            <input 
              type="text" 
              value={editInputValue}
              onChange={(e) => setEditInputValue(e.target.value)}
              className="bg-bgPrimary text-textPrimary text-sm px-3 py-1 rounded border border-accentPrimary outline-none w-full"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
            />
            <button onClick={saveEdit} className="p-1.5 text-accentPrimary hover:bg-bgPrimary rounded"><Check className="w-4 h-4" /></button>
            <button onClick={clearSelection} className="p-1.5 text-danger hover:bg-bgPrimary rounded"><X className="w-4 h-4" /></button>
          </div>
        ) : (
          <>
            <Button variant="ghost" size="sm" icon={Trash2} onClick={handleDeleteSelected} className="text-danger hover:text-danger hover:bg-danger/10">Delete</Button>
            {selectedWordIds.length === 1 && (
              <Button variant="ghost" size="sm" icon={Edit3} onClick={startEditing}>Replace</Button>
            )}
            <Button variant="ghost" size="sm" icon={RotateCcw} onClick={handleRestoreSelected}>Restore</Button>
            <div className="flex-1" />
            <Button variant="ghost" size="sm" icon={X} onClick={clearSelection}>Clear Selection</Button>
          </>
        )}
      </div>

      {/* Transcript View */}
      <div className="flex-1 p-6 overflow-y-auto bg-bgPrimary text-lg leading-loose font-sans">
        <div className="flex flex-wrap gap-x-1.5 gap-y-2">
          {words.map((word) => {
            const isSelected = selectedWordIds.includes(word.id);
            const isDeleted = word.status === 'deleted';
            const isEdited = word.status === 'edited';

            return (
              <span 
                key={word.id}
                onClick={() => toggleWordSelection(word.id)}
                className={cn(
                  "px-1.5 py-0.5 rounded cursor-pointer transition-colors border select-none",
                  isSelected && !editingWordId ? "bg-accentPrimary/20 border-accentPrimary text-accentPrimary" : "border-transparent",
                  !isSelected && !isDeleted && !isEdited ? "text-textPrimary hover:bg-bgTertiary" : "",
                  isDeleted ? "text-textSecondary line-through bg-danger/10 border-danger/20 decoration-danger" : "",
                  isEdited && !isSelected ? "text-warning border-warning/30 bg-warning/10" : ""
                )}
                title={`Start: ${word.start}s | End: ${word.end}s`}
              >
                {isEdited ? word.replacement : word.text}
              </span>
            );
          })}
        </div>
      </div>
      
    </div>
  );
};