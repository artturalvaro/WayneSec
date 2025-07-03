
## 🦇 WayneSec

- **WayneSec** é um sistema de gerenciamento de segurança desenvolvido para as Indústrias Wayne, com o objetivo de otimizar o controle de acesso, gerenciar recursos internos e garantir maior segurança para Gotham City.

- Este projeto foi desenvolvido como parte do Projeto Final do curso **Dev Full Stack**.

────────────────────────────────────────────

## 🚀 Tecnologias Utilizadas

- Frontend: Next.js (React + TypeScript)
- Backend: Python (FastAPI)
- Banco de Dados: MySQL
- Autenticação: JWT Token
- Estilização: Tailwind CSS / ShadCN UI

────────────────────────────────────────────

## 🎯 Funcionalidades

**🔐 Controle de Acesso**
- Login e registro com autenticação segura.
- Níveis de acesso: Funcionário, Gerente e Administrador.
- Autorização baseada em permissões.

**🧰 Gestão de Recursos**
- Cadastro e edição de equipamentos, veículos e dispositivos.
- Listagem, filtros e visualização de recursos.

**📊 Dashboard de Visualização**
- Painel com gráficos e indicadores:
  - Status da segurança.
  - Uso de recursos.
  - Atividades recentes.

────────────────────────────────────────────

## 📁 Estrutura do Projeto

- wayne-sec/
- ├── frontend/         → Next.js
- ├── backend/          → Python API
- ├── README.txt
- └── database/         → Scripts e migrations

────────────────────────────────────────────

## ⚙️ Instalação

1. **Clonar o repositório**:
   - git clone https://github.com/artturalvaro/wayne-sec.git
   - cd wayne-sec

2. **Frontend (Next.js)**:
   - cd frontend
   - npm install
   - npm run dev

3. **Backend (Python)**:
   - cd backend
   - python -m venv venv
   - source venv/bin/activate  # Windows: venv\Scripts\activate
   - pip install -r requirements.txt
   - uvicorn main:app --reload

────────────────────────────────────────────

## ✅ Requisitos

- Node.js 18+
- Python 3.10+
- MySQL
- Git

────────────────────────────────────────────

## 📌 Observações

- JWT para autenticação segura.
- Comunicação via REST API.
- Separação clara entre frontend e backend.

────────────────────────────────────────────

## 👨‍💻 Autor

Desenvolvido por **Artur Álvaro** como projeto final do curso **Dev Full Stack**.
Inspirado no universo do Batman 🦇.

────────────────────────────────────────────

📄 Licença

Este projeto está licenciado sob a MIT License.