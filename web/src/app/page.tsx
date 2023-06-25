"use client";
import React, { useEffect } from "react";
import LoginRegister from "./login-register/page";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./dashboard/page";
import CadastroEscola from "./(cadastros)/cadastro-escola/page";
import CadastroProfessor from "./(cadastros)/cadastro-professor/page";
import BoletimControleAulasEventuais from "./(boletins)/boletim-controle-aulas-eventuais/page";

export default function Home() {
  return (
    <div>
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>

      <ProtectedRoute>
        <BoletimControleAulasEventuais />
      </ProtectedRoute>

      <ProtectedRoute>
        <CadastroEscola />
      </ProtectedRoute>

      <ProtectedRoute>
        <CadastroProfessor />
      </ProtectedRoute>

      <LoginRegister />
    </div>
  );
}

