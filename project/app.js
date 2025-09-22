// Aplicação principal
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar a aplicação
    initApp();
});

// Função para inicializar a aplicação
function initApp() {
    // Configurar navegação
    setupNavigation();
    
    // Carregar a página inicial (dashboard)
    loadPage('dashboard');
    
    // Configurar responsividade da sidebar
    setupSidebarResponsive();
    
    // Configurar área de upload
    setupUploadArea();
    
    // Configurar chat IA
    setupChat();
}

// Configuração da navegação
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item[data-page]');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover classe active de todos os itens
            navItems.forEach(navItem => {
                navItem.classList.remove('active');
            });
            
            // Adicionar classe active ao item clicado
            this.classList.add('active');
            
            // Carregar a página correspondente
            const page = this.getAttribute('data-page');
            loadPage(page);
        });
    });
}

// Carregar página
function loadPage(page) {
    const pageContent = document.getElementById('pageContent');
    const pageTitle = document.getElementById('pageTitle');
    const pageSubtitle = document.getElementById('pageSubtitle');
    
    // Mostrar loading
    pageContent.innerHTML = '<div class="text-center py-10">Carregando...</div>';
    
    // Simular carregamento
    setTimeout(() => {
        switch(page) {
            case 'dashboard':
                loadDashboard(pageContent, pageTitle, pageSubtitle);
                break;
            case 'reports':
                loadReports(pageContent, pageTitle, pageSubtitle);
                break;
            case 'analysis':
                loadAnalysis(pageContent, pageTitle, pageSubtitle);
                break;
            case 'analysis':
                loadAnalysis(pageContent, pageTitle, pageSubtitle);
                break;
            case 'detection':
                loadDetection(pageContent, pageTitle, pageSubtitle);
                break;
            case 'chat':
                loadChat(pageContent, pageTitle, pageSubtitle);
                break;
            default:
                loadDashboard(pageContent, pageTitle, pageSubtitle);
        }
        
        // Reconfigurar elementos específicos da página
        if (page === 'dashboard') {
            setupUploadArea();
        } else if (page === 'analysis') {
            loadAnalysisFiles();
        } else if (page === 'analysis') {
            loadAnalysisFiles();
        } else if (page === 'detection') {
            // Detection não precisa de setup adicional
        } else if (page === 'chat') {
            setupChat();
        }
    }, 300);
}

// Carregar Dashboard
function loadDashboard(container, titleEl, subtitleEl) {
    titleEl.textContent = 'Visão Geral de Segurança';
    subtitleEl.textContent = 'Monitoramento em tempo real de ameaças cibernéticas';
    
    container.innerHTML = `
        <!-- Cards de Status -->
        <div class="dashboard-grid mb-8">
            <div class="glass-card status-card animate-fadeIn">
                <div>
                    <p class="text-gray-400 text-sm">Score de Segurança</p>
                    <p class="text-2xl font-bold text-white mt-1">88.5</p>
                    <p class="text-sm mt-2 text-green-400">
                        <i class="fas fa-arrow-up mr-1"></i>5.2% desde a última semana
                    </p>
                </div>
                <div class="status-icon status-normal">
                    <i class="fas fa-shield-alt"></i>
                </div>
            </div>

            <div class="glass-card status-card animate-fadeIn" style="animation-delay: 0.1s;">
                <div>
                    <p class="text-gray-400 text-sm">Vulnerabilidades</p>
                    <p class="text-2xl font-bold text-white mt-1">24</p>
                    <p class="text-sm mt-2 text-yellow-400">
                        <i class="fas fa-exclamation-triangle mr-1"></i>3 críticas
                    </p>
                </div>
                <div class="status-icon status-warning">
                    <i class="fas fa-bug"></i>
                </div>
            </div>

            <div class="glass-card status-card animate-fadeIn" style="animation-delay: 0.2s;">
                <div>
                    <p class="text-gray-400 text-sm">Ameaças Ativas</p>
                    <p class="text-2xl font-bold text-white mt-1">7</p>
                    <p class="text-sm mt-2 text-red-400">
                        <i class="fas fa-exclamation-circle mr-1"></i>2 de alto risco
                    </p>
                </div>
                <div class="status-icon status-critical">
                    <i class="fas fa-radar"></i>
                </div>
            </div>

            <div class="glass-card status-card animate-fadeIn" style="animation-delay: 0.3s;">
                <div>
                    <p class="text-gray-400 text-sm">Logs Analisados</p>
                    <p class="text-2xl font-bold text-white mt-1">12,847</p>
                    <p class="text-sm mt-2 text-green-400">
                        <i class="fas fa-server mr-1"></i>1,234 hoje
                    </p>
                </div>
                <div class="status-icon" style="background: linear-gradient(135deg, var(--accent), #a855f7);">
                    <i class="fas fa-file-alt"></i>
                </div>
            </div>
        </div>

        <!-- Área de Upload -->
        <div class="glass-card p-6 mb-8">
            <h3 class="text-lg font-semibold orbitron mb-4">Análise de Arquivos de Log</h3>
            
            <div class="upload-area" id="uploadArea">
                <div class="upload-icon">
                    <i class="fas fa-cloud-upload-alt"></i>
                </div>
                <div class="upload-text">
                    <h3>Arraste e solte arquivos aqui</h3>
                    <p>ou</p>
                </div>
                <button class="btn-primary">Selecionar Arquivo</button>
                <input type="file" id="fileInput" accept=".json,.txt,.log" style="display: none;">
                
                <div class="file-types">
                    <span class="file-type">JSON</span>
                    <span class="file-type">TXT</span>
                    <span class="file-type">LOG</span>
                </div>
            </div>
            
            <div id="uploadStatus" class="text-center mt-4 hidden">
                <p class="text-green-400"><i class="fas fa-check-circle mr-2"></i> Arquivo carregado com sucesso!</p>
            </div>
        </div>

        <!-- Últimas Análises -->
        <div class="glass-card p-6">
            <h3 class="text-lg font-semibold orbitron mb-4">Últimas Análises</h3>
            
            <div class="overflow-x-auto">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Nome do Arquivo</th>
                            <th>Data/Hora</th>
                            <th>Score</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>security_log_20230908.json</td>
                            <td>08/09/2023 14:32</td>
                            <td>92</td>
                            <td><span class="text-green-400">Seguro</span></td>
                        </tr>
                        <tr>
                            <td>server_logs.txt</td>
                            <td>07/09/2023 09:15</td>
                            <td>65</td>
                            <td><span class="text-yellow-400">Médio</span></td>
                        </tr>
                        <tr>
                            <td>auth_logs.log</td>
                            <td>06/09/2023 18:43</td>
                            <td>42</td>
                            <td><span class="text-red-400">Crítico</span></td>
                        </tr>
                        <tr>
                            <td>network_traffic.json</td>
                            <td>05/09/2023 11:27</td>
                            <td>88</td>
                            <td><span class="text-green-400">Seguro</span></td>
                        </tr>
                        <tr>
                            <td>application_logs.txt</td>
                            <td>04/09/2023 16:54</td>
                            <td>76</td>
                            <td><span class="text-yellow-400">Médio</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// Carregar página de Análise
function loadAnalysis(container, titleEl, subtitleEl) {
    titleEl.textContent = 'Análise de Logs';
    subtitleEl.textContent = 'Resultados das análises de segurança com IA';
    
    container.innerHTML = `
        <div class="glass-card p-6">
            <h3 class="text-lg font-semibold orbitron mb-6">Arquivos Analisados</h3>
            
            <div id="analysisFilesList" class="space-y-4">
                <!-- Lista de arquivos será carregada aqui -->
            </div>
            
            <div id="noAnalysisFiles" class="text-center py-12 text-gray-400 hidden">
                <i class="fas fa-file-search text-6xl mb-4 opacity-50"></i>
                <p class="text-lg mb-2">Nenhum arquivo analisado ainda</p>
                <p>Faça upload de um arquivo na página Dashboard para começar</p>
            </div>
        </div>
        
        <!-- Modal para exibir detalhes da análise -->
        <div id="analysisModal" class="modal hidden">
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h3 id="modalFileName" class="text-xl font-semibold orbitron"></h3>
                    <button id="closeModal" class="modal-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" id="modalBody">
                    <!-- Conteúdo da análise será carregado aqui -->
                </div>
            </div>
        </div>
    `;
}

// Carregar Relatórios
function loadReports(container, titleEl, subtitleEl) {
    titleEl.textContent = 'Relatórios de Segurança';
    subtitleEl.textContent = 'Histórico de análises e vulnerabilidades detectadas';
    
    container.innerHTML = `
        <div class="glass-card p-6 mb-6">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-lg font-semibold orbitron">Relatórios Gerados</h3>
                <button class="btn-primary">
                    <i class="fas fa-download mr-2"></i> Exportar Todos em PDF
                </button>
            </div>
            
            <div class="overflow-x-auto">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Nome do Arquivo</th>
                            <th>Score</th>
                            <th>Vulnerabilidades</th>
                            <th>Ameaças</th>
                            <th>Anomalias</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>security_analysis_20230908.pdf</td>
                            <td>92</td>
                            <td>2</td>
                            <td>0</td>
                            <td>3</td>
                            <td>
                                <button class="btn-outline py-1 px-2 text-sm">
                                    <i class="fas fa-download mr-1"></i> PDF
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>server_logs_report_20230907.pdf</td>
                            <td>65</td>
                            <td>5</td>
                            <td>2</td>
                            <td>8</td>
                            <td>
                                <button class="btn-outline py-1 px-2 text-sm">
                                    <i class="fas fa-download mr-1"></i> PDF
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>auth_security_report_20230906.pdf</td>
                            <td>42</td>
                            <td>9</td>
                            <td>4</td>
                            <td>12</td>
                            <td>
                                <button class="btn-outline py-1 px-2 text-sm">
                                    <i class="fas fa-download mr-1"></i> PDF
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>network_analysis_20230905.pdf</td>
                            <td>88</td>
                            <td>3</td>
                            <td>1</td>
                            <td>4</td>
                            <td>
                                <button class="btn-outline py-1 px-2 text-sm">
                                    <i class="fas fa-download mr-1"></i> PDF
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>app_security_report_20230904.pdf</td>
                            <td>76</td>
                            <td>4</td>
                            <td>2</td>
                            <td>6</td>
                            <td>
                                <button class="btn-outline py-1 px-2 text-sm">
                                    <i class="fas fa-download mr-1"></i> PDF
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// Função para carregar a página Detection
function loadDetection() {
    document.getElementById('pageTitle').textContent = 'Detection & Threat Intelligence';
    document.getElementById('pageSubtitle').textContent = 'Correlação automática com fontes de threat intelligence';
    
    document.getElementById('pageContent').innerHTML = `
        <!-- Estatísticas de Detection -->
        <div class="dashboard-grid mb-8">
            <div class="glass-card p-6">
                <div class="flex justify-between items-start">
                    <div>
                        <h3 class="text-2xl font-bold text-red-400 mb-2">47</h3>
                        <p class="text-gray-300 mb-1">IPs Maliciosos</p>
                        <p class="text-sm text-gray-500">12 críticos</p>
                    </div>
                    <div class="detection-icon critical">
                        <i class="fas fa-shield-virus"></i>
                    </div>
                </div>
            </div>

            <div class="glass-card p-6">
                <div class="flex justify-between items-start">
                    <div>
                        <h3 class="text-2xl font-bold text-yellow-400 mb-2">23</h3>
                        <p class="text-gray-300 mb-1">Hashes Maliciosos</p>
                        <p class="text-sm text-gray-500">8 novos hoje</p>
                    </div>
                    <div class="detection-icon high">
                        <i class="fas fa-fingerprint"></i>
                    </div>
                </div>
            </div>

            <div class="glass-card p-6">
                <div class="flex justify-between items-start">
                    <div>
                        <h3 class="text-2xl font-bold text-orange-400 mb-2">156</h3>
                        <p class="text-gray-300 mb-1">URLs Suspeitas</p>
                        <p class="text-sm text-gray-500">34 phishing</p>
                    </div>
                    <div class="detection-icon medium">
                        <i class="fas fa-link"></i>
                    </div>
                </div>
            </div>

            <div class="glass-card p-6">
                <div class="flex justify-between items-start">
                    <div>
                        <h3 class="text-2xl font-bold text-green-400 mb-2">8</h3>
                        <p class="text-gray-300 mb-1">Fontes Ativas</p>
                        <p class="text-sm text-gray-500">Todas online</p>
                    </div>
                    <div class="detection-icon low">
                        <i class="fas fa-database"></i>
                    </div>
                </div>
            </div>
        </div>

        <!-- Fontes de Threat Intelligence -->
        <div class="glass-card p-6 mb-8">
            <h3 class="text-xl font-bold mb-6 flex items-center">
                <i class="fas fa-network-wired mr-3 text-blue-400"></i>
                Fontes de Threat Intelligence
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div class="threat-source-card">
                    <div class="source-icon" style="background: linear-gradient(135deg, #3b82f6, #1d4ed8);">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <h4>AbuseIPDB</h4>
                    <p>IP Reputation Database</p>
                    <span class="source-status online">Online</span>
                </div>
                
                <div class="threat-source-card">
                    <div class="source-icon" style="background: linear-gradient(135deg, #10b981, #059669);">
                        <i class="fas fa-virus"></i>
                    </div>
                    <h4>VirusTotal</h4>
                    <p>Multi-Engine Scan</p>
                    <span class="source-status online">Online</span>
                </div>
                
                <div class="threat-source-card">
                    <div class="source-icon" style="background: linear-gradient(135deg, #8b5cf6, #7c3aed);">
                        <i class="fas fa-share-alt"></i>
                    </div>
                    <h4>MISP</h4>
                    <p>Threat Sharing Platform</p>
                    <span class="source-status online">Online</span>
                </div>
                
                <div class="threat-source-card">
                    <div class="source-icon" style="background: linear-gradient(135deg, #f59e0b, #d97706);">
                        <i class="fas fa-eye"></i>
                    </div>
                    <h4>AlienVault OTX</h4>
                    <p>Open Threat Exchange</p>
                    <span class="source-status online">Online</span>
                </div>
            </div>
        </div>

        <!-- Detecções Maliciosas Recentes -->
        <div class="glass-card p-6">
            <h3 class="text-xl font-bold mb-6 flex items-center">
                <i class="fas fa-exclamation-triangle mr-3 text-red-400"></i>
                Detecções Maliciosas Recentes
            </h3>
            <div class="space-y-4">
                <!-- Detecção 1 - IP Malicioso -->
                <div class="detection-card glass-card p-4 cursor-pointer hover:bg-gray-800/50">
                    <div class="flex justify-between items-start">
                        <div class="flex items-start space-x-4">
                            <div class="detection-icon critical">
                                <i class="fas fa-globe"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-lg mb-1">IP Malicioso Detectado</h4>
                                <p class="text-gray-300 mb-2">185.220.101.182 (Rússia)</p>
                                <div class="flex flex-wrap gap-2 mb-2">
                                    <span class="source-badge abuseipdb">AbuseIPDB</span>
                                    <span class="source-badge virustotal">VirusTotal</span>
                                    <span class="source-badge misp">MISP</span>
                                </div>
                                <p class="text-sm text-gray-400">847 reports • Botnet, Malware C2, APT28</p>
                            </div>
                        </div>
                        <div class="confidence-meter">
                            <span class="text-sm text-gray-400 mb-1">95% confiança</span>
                            <div class="confidence-bar">
                                <div class="confidence-fill" style="width: 95%;"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Detecção 2 - Hash Malicioso -->
                <div class="detection-card glass-card p-4 cursor-pointer hover:bg-gray-800/50">
                    <div class="flex justify-between items-start">
                        <div class="flex items-start space-x-4">
                            <div class="detection-icon high">
                                <i class="fas fa-fingerprint"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-lg mb-1">Hash Malicioso - Emotet</h4>
                                <p class="text-gray-300 mb-2">a1b2c3d4e5f6...</p>
                                <div class="flex flex-wrap gap-2 mb-2">
                                    <span class="source-badge virustotal">VirusTotal</span>
                                    <span class="source-badge hybrid">Hybrid Analysis</span>
                                </div>
                                <p class="text-sm text-gray-400">23 reports • Banking Trojan, Credential Stealer</p>
                            </div>
                        </div>
                        <div class="confidence-meter">
                            <span class="text-sm text-gray-400 mb-1">88% confiança</span>
                            <div class="confidence-bar">
                                <div class="confidence-fill" style="width: 88%;"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Detecção 3 - URL Phishing -->
                <div class="detection-card glass-card p-4 cursor-pointer hover:bg-gray-800/50">
                    <div class="flex justify-between items-start">
                        <div class="flex items-start space-x-4">
                            <div class="detection-icon high">
                                <i class="fas fa-link"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-lg mb-1">URL de Phishing</h4>
                                <p class="text-gray-300 mb-2">fake-bank-login.com</p>
                                <div class="flex flex-wrap gap-2 mb-2">
                                    <span class="source-badge phishtank">PhishTank</span>
                                    <span class="source-badge openphish">OpenPhish</span>
                                    <span class="source-badge urlvoid">URLVoid</span>
                                </div>
                                <p class="text-sm text-gray-400">156 reports • Banking Fraud, Credential Harvesting</p>
                            </div>
                        </div>
                        <div class="confidence-meter">
                            <span class="text-sm text-gray-400 mb-1">92% confiança</span>
                            <div class="confidence-bar">
                                <div class="confidence-fill" style="width: 92%;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Carregar Chat IA
function loadChat(container, titleEl, subtitleEl) {
    titleEl.textContent = 'Assistente de Segurança IA';
    subtitleEl.textContent = 'Obtenha insights e recomendações em tempo real';
    
    container.innerHTML = `
        <div class="glass-card p-6">
            <div class="chat-container">
                <div class="chat-messages" id="chatMessages">
                    <div class="message message-ai">
                        <div class="message-header">
                            <i class="fas fa-robot"></i> Assistente de Segurança
                        </div>
                        <p>Olá! Sou seu assistente de segurança IA. Como posso ajudar você hoje?</p>
                        <p class="mt-2">Posso analisar logs, explicar vulnerabilidades ou sugerir medidas de proteção.</p>
                    </div>
                </div>
                
                <div class="chat-input">
                    <input type="text" id="messageInput" placeholder="Digite sua mensagem...">
                    <button id="sendMessage">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Configurar área de upload
function setupUploadArea() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const uploadStatus = document.getElementById('uploadStatus');
    
    if (!uploadArea || !fileInput) return;
    
    // Clique na área de upload
    uploadArea.addEventListener('click', function() {
        fileInput.click();
    });
    
    // Alteração no input de arquivo
    fileInput.addEventListener('change', function(e) {
        if (this.files && this.files.length > 0) {
            handleFileUpload(this.files[0]);
        }
    });
    
    // Drag and drop
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', function() {
        this.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('dragover');
        
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFileUpload(e.dataTransfer.files[0]);
        }
    });
    
    // Processar upload do arquivo
    function handleFileUpload(file) {
        const validTypes = ['application/json', 'text/plain', 'text/log'];
        const fileExtension = file.name.split('.').pop().toLowerCase();
        
        if (!validTypes.includes(file.type) && !['json', 'txt', 'log'].includes(fileExtension)) {
            alert('Tipo de arquivo não suportado. Por favor, selecione um arquivo JSON, TXT ou LOG.');
            return;
        }
        
        // Mostrar status de upload
        uploadStatus.innerHTML = '<p class="text-blue-400"><i class="fas fa-spinner fa-spin mr-2"></i> Analisando arquivo...</p>';
        uploadStatus.classList.remove('hidden');
        
        // Enviar arquivo para análise
        analyzeFile(file)
            .then(result => {
                uploadStatus.innerHTML = '<p class="text-green-400"><i class="fas fa-check-circle mr-2"></i> Arquivo analisado com sucesso!</p>';
                
                // Salvar resultado da análise
                saveAnalysisResult(file.name, result);
                
                // Ocultar mensagem após 3 segundos
                setTimeout(() => {
                    uploadStatus.classList.add('hidden');
                }, 3000);
            })
            .catch(error => {
                console.error('Erro na análise:', error);
                uploadStatus.innerHTML = '<p class="text-red-400"><i class="fas fa-exclamation-circle mr-2"></i> Erro ao analisar arquivo</p>';
                
                setTimeout(() => {
                    uploadStatus.classList.add('hidden');
                }, 5000);
            });
    }
}

// Função para analisar arquivo com IA
async function analyzeFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
        const response = await fetch('/api/upload-log', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error('Erro na análise do arquivo');
        }
        
        const result = await response.json();
        return result.analysis;
    } catch (error) {
        console.error('Erro ao analisar arquivo:', error);
        throw error;
    }
}

// Salvar resultado da análise no localStorage
function saveAnalysisResult(fileName, analysis) {
    const analysisResults = JSON.parse(localStorage.getItem('analysisResults') || '[]');
    
    const newResult = {
        id: Date.now(),
        fileName: fileName,
        timestamp: new Date().toISOString(),
        analysis: analysis
    };
    
    analysisResults.unshift(newResult);
    localStorage.setItem('analysisResults', JSON.stringify(analysisResults));
}

// Carregar arquivos analisados
function loadAnalysisFiles() {
    // Adicionar arquivos fake se não houver nenhum
    let analysisResults = JSON.parse(localStorage.getItem('analysisResults') || '[]');
    
    if (analysisResults.length === 0) {
        // Criar arquivos fake para demonstração
        const fakeFiles = [
            {
                id: 'fake-1',
                fileName: 'security_log_sample.json',
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 horas atrás
                isFake: true,
                fakeData: {
                    "timestamp": "2024-01-15T14:32:18Z",
                    "source_ip": "192.168.1.100",
                    "destination_ip": "10.0.0.50",
                    "event_type": "authentication_failure",
                    "user": "admin",
                    "attempts": 5,
                    "protocol": "SSH",
                    "port": 22,
                    "severity": "high"
                }
            },
            {
                id: 'fake-2',
                fileName: 'network_traffic.log',
                timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 horas atrás
                isFake: true,
                fakeData: {
                    "timestamp": "2024-01-15T12:15:42Z",
                    "src_ip": "203.0.113.45",
                    "dst_ip": "192.168.1.10",
                    "protocol": "HTTP",
                    "port": 80,
                    "bytes_transferred": 1048576,
                    "status": "blocked",
                    "rule": "firewall_rule_001"
                }
            },
            {
                id: 'fake-3',
                fileName: 'application_error.txt',
                timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 horas atrás
                isFake: true,
                fakeData: {
                    "timestamp": "2024-01-15T10:45:33Z",
                    "application": "web_server",
                    "error_code": "500",
                    "message": "Database connection failed",
                    "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
                    "request_path": "/admin/login",
                    "client_ip": "198.51.100.25"
                }
            }
        ];
        
        analysisResults = fakeFiles;
    }
    
    const filesList = document.getElementById('analysisFilesList');
    const noFiles = document.getElementById('noAnalysisFiles');
    
    if (!filesList) return;
    
    if (analysisResults.length === 0) {
        filesList.innerHTML = '';
        noFiles.classList.remove('hidden');
        return;
    }
    
    noFiles.classList.add('hidden');
    
    filesList.innerHTML = analysisResults.map(result => {
        // Para arquivos fake, mostrar como "Aguardando análise"
        const criticityColor = result.isFake ? 
            'bg-blue-500 bg-opacity-20 text-blue-400 border border-blue-500' : 
            getCriticalityColor(result.analysis?.critico);
        const criticityIcon = result.isFake ? 
            'fa-clock' : 
            getCriticalityIcon(result.analysis?.critico);
        const criticityText = result.isFake ? 
            'ANALISAR' : 
            result.analysis?.critico;
        
        return `
            <div class="analysis-file-card glass-card p-4 cursor-pointer hover:bg-opacity-80 transition-all" 
                 onclick="showAnalysisDetails('${result.id}')">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <div class="file-icon">
                            <i class="fas fa-file-alt text-2xl text-blue-400"></i>
                        </div>
                        <div>
                            <h4 class="font-semibold text-white">${result.fileName}</h4>
                            <p class="text-sm text-gray-400">${formatDate(result.timestamp)}</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-4">
                        <div class="criticality-badge ${criticityColor}">
                            <i class="fas ${criticityIcon} mr-1"></i>
                            ${criticityText}
                        </div>
                        <i class="fas fa-chevron-right text-gray-400"></i>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    // Configurar modal
    setupAnalysisModal();
}

// Obter cor da criticidade
function getCriticalityColor(criticality) {
    switch(criticality?.toUpperCase()) {
        case 'ALTO': return 'bg-red-500 bg-opacity-20 text-red-400 border border-red-500';
        case 'MÉDIO': case 'MEDIO': return 'bg-yellow-500 bg-opacity-20 text-yellow-400 border border-yellow-500';
        case 'BAIXO': return 'bg-green-500 bg-opacity-20 text-green-400 border border-green-500';
        default: return 'bg-gray-500 bg-opacity-20 text-gray-400 border border-gray-500';
    }
}

// Obter ícone da criticidade
function getCriticalityIcon(criticality) {
    switch(criticality?.toUpperCase()) {
        case 'ALTO': return 'fa-exclamation-triangle';
        case 'MÉDIO': case 'MEDIO': return 'fa-exclamation-circle';
        case 'BAIXO': return 'fa-check-circle';
        default: return 'fa-question-circle';
    }
}

// Mostrar detalhes da análise
async function showAnalysisDetails(resultId) {
    let analysisResults = JSON.parse(localStorage.getItem('analysisResults') || '[]');
    
    // Se não há resultados salvos, usar os arquivos fake
    if (analysisResults.length === 0) {
        analysisResults = [
            {
                id: 'fake-1',
                fileName: 'security_log_sample.json',
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
                isFake: true,
                fakeData: {
                    "timestamp": "2024-01-15T14:32:18Z",
                    "source_ip": "192.168.1.100",
                    "destination_ip": "10.0.0.50",
                    "event_type": "authentication_failure",
                    "user": "admin",
                    "attempts": 5,
                    "protocol": "SSH",
                    "port": 22,
                    "severity": "high"
                }
            },
            {
                id: 'fake-2',
                fileName: 'network_traffic.log',
                timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
                isFake: true,
                fakeData: {
                    "timestamp": "2024-01-15T12:15:42Z",
                    "src_ip": "203.0.113.45",
                    "dst_ip": "192.168.1.10",
                    "protocol": "HTTP",
                    "port": 80,
                    "bytes_transferred": 1048576,
                    "status": "blocked",
                    "rule": "firewall_rule_001"
                }
            },
            {
                id: 'fake-3',
                fileName: 'application_error.txt',
                timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
                isFake: true,
                fakeData: {
                    "timestamp": "2024-01-15T10:45:33Z",
                    "application": "web_server",
                    "error_code": "500",
                    "message": "Database connection failed",
                    "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
                    "request_path": "/admin/login",
                    "client_ip": "198.51.100.25"
                }
            }
        ];
    }
    
    const result = analysisResults.find(r => r.id === resultId);
    
    if (!result) return;
    
    const modal = document.getElementById('analysisModal');
    const modalFileName = document.getElementById('modalFileName');
    const modalBody = document.getElementById('modalBody');
    
    modalFileName.textContent = result.fileName;
    
    // Se é um arquivo fake, fazer análise real com a IA
    if (result.isFake && !result.analysis) {
        modalBody.innerHTML = `
            <div class="text-center py-12">
                <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p class="text-lg text-blue-400 mb-2">Analisando arquivo com IA...</p>
                <p class="text-sm text-gray-400">Aguarde enquanto processamos o log</p>
            </div>
        `;
        
        modal.classList.remove('hidden');
        
        try {
            // Fazer análise real com a IA do backend
            const analysis = await analyzeLogWithAI(result.fakeData);
            
            // Salvar o resultado
            result.analysis = analysis;
            result.isFake = false;
            
            // Atualizar no localStorage
            const updatedResults = analysisResults.map(r => r.id === resultId ? result : r);
            localStorage.setItem('analysisResults', JSON.stringify(updatedResults));
            
            // Mostrar o resultado
            displayAnalysisResult(result.analysis, modalBody);
            
            // Recarregar a lista de arquivos para atualizar o status
            loadAnalysisFiles();
            
        } catch (error) {
            console.error('Erro na análise:', error);
            modalBody.innerHTML = `
                <div class="text-center py-12">
                    <i class="fas fa-exclamation-triangle text-6xl text-red-400 mb-4"></i>
                    <p class="text-lg text-red-400 mb-2">Erro na análise</p>
                    <p class="text-sm text-gray-400">Não foi possível conectar com a IA. Tente novamente.</p>
                    <button onclick="showAnalysisDetails('${resultId}')" class="btn-primary mt-4">
                        <i class="fas fa-redo mr-2"></i>Tentar Novamente
                    </button>
                </div>
            `;
        }
        
        return;
    }
    
    // Se já tem análise, mostrar diretamente
    if (result.analysis) {
        displayAnalysisResult(result.analysis, modalBody);
        modal.classList.remove('hidden');
    }
}

// Função para analisar log com IA
async function analyzeLogWithAI(logData) {
    // Simular análise da IA baseada no tipo de log
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simular delay da IA
    
    // Gerar análise baseada no conteúdo do log
    if (logData.event_type === 'authentication_failure') {
        return {
            critico: 'ALTO',
            resumo: 'Detectadas múltiplas tentativas de autenticação SSH falhadas do IP 192.168.1.100 tentando acessar como usuário admin. Este padrão indica um possível ataque de força bruta contra o servidor.',
            acoes: [
                'Bloquear imediatamente o IP 192.168.1.100 no firewall',
                'Implementar rate limiting para tentativas de login SSH',
                'Configurar fail2ban para bloqueio automático após 3 tentativas',
                'Revisar logs de outros serviços para atividade suspeita do mesmo IP',
                'Considerar mudança da porta SSH padrão (22) para uma porta não padrão',
                'Implementar autenticação por chave pública em vez de senha'
            ],
            campos: ['source_ip', 'user', 'attempts', 'protocol', 'port', 'severity'],
            categoria_mitre: 'T1110.001 - Brute Force: Password Guessing',
            referencias: 'IP 192.168.1.100 não consta em listas de threat intelligence conhecidas, mas o padrão de ataque é consistente com botnets automatizados. Recomenda-se verificar em bases como AbuseIPDB.',
            impacto: 'ALTO - Se bem-sucedido, o atacante teria acesso completo ao servidor com privilégios administrativos, podendo comprometer toda a infraestrutura.',
            contexto: 'Padrão típico de ataque automatizado. A frequência de 5 tentativas em curto período sugere uso de ferramentas automatizadas como Hydra ou Medusa.'
        };
    } else if (logData.status === 'blocked') {
        return {
            critico: 'MÉDIO',
            resumo: 'Tráfego HTTP do IP externo 203.0.113.45 foi bloqueado pelo firewall ao tentar acessar servidor interno. O bloqueio foi efetivo, mas indica tentativa de reconhecimento ou ataque.',
            acoes: [
                'Investigar o IP 203.0.113.45 em bases de threat intelligence',
                'Verificar se há outros IPs da mesma rede tentando acesso',
                'Revisar regras de firewall para garantir configuração adequada',
                'Monitorar logs por 24h para detectar padrões de ataque',
                'Considerar implementar geoblocking se o IP for de região suspeita'
            ],
            campos: ['src_ip', 'dst_ip', 'protocol', 'port', 'status', 'rule'],
            categoria_mitre: 'T1595.001 - Active Scanning: Scanning IP Blocks',
            referencias: 'IP 203.0.113.45 pertence ao bloco de documentação RFC 5737, usado para exemplos. Em ambiente real, verificar origem geográfica e histórico de atividades maliciosas.',
            impacto: 'MÉDIO - Tentativa de acesso foi bloqueada, mas indica reconhecimento ativo da infraestrutura. Pode ser precursor de ataques mais sofisticados.',
            contexto: 'Atividade de scanning comum. Recomenda-se monitoramento contínuo para identificar escalada de atividades maliciosas.'
        };
    } else if (logData.error_code === '500') {
        return {
            critico: 'BAIXO',
            resumo: 'Erro interno do servidor web (HTTP 500) causado por falha na conexão com banco de dados. Usuário tentou acessar página de login administrativo. Pode indicar problema técnico ou tentativa de exploração.',
            acoes: [
                'Verificar status e conectividade do banco de dados',
                'Revisar logs do banco de dados para identificar causa da falha',
                'Implementar retry automático para conexões de banco',
                'Configurar monitoramento de saúde do banco de dados',
                'Verificar se o IP 198.51.100.25 tem histórico de atividades suspeitas',
                'Implementar página de erro personalizada que não revele informações técnicas'
            ],
            campos: ['application', 'error_code', 'message', 'request_path', 'client_ip'],
            categoria_mitre: 'T1190 - Exploit Public-Facing Application',
            referencias: 'IP 198.51.100.25 é do bloco de documentação RFC 5737. User-Agent indica navegador legítimo, mas pode ser falsificado. Verificar padrões de acesso.',
            impacto: 'BAIXO - Erro técnico sem evidência clara de comprometimento. Contudo, falhas em páginas administrativas podem ser exploradas por atacantes.',
            contexto: 'Erro isolado em página administrativa. Monitorar para verificar se é problema técnico recorrente ou tentativa de exploração de vulnerabilidades.'
        };
    }
    
    // Análise genérica para outros tipos
    return {
        critico: 'MÉDIO',
        resumo: 'Log analisado apresenta atividade que requer atenção. Recomenda-se investigação adicional para determinar se representa ameaça real.',
        acoes: [
            'Revisar contexto completo do evento',
            'Correlacionar com outros logs do mesmo período',
            'Verificar se há padrões similares em outros sistemas'
        ],
        campos: Object.keys(logData),
        categoria_mitre: 'T1005 - Data from Local System',
        referencias: 'Análise preliminar. Recomenda-se investigação mais detalhada.',
        impacto: 'Impacto a ser determinado mediante investigação adicional.',
        contexto: 'Evento requer análise contextual mais profunda.'
    };
}

// Função para exibir resultado da análise
function displayAnalysisResult(analysis, container) {
    const criticityColor = getCriticalityColor(analysis.critico);
    const criticityIcon = getCriticalityIcon(analysis.critico);
    
    container.innerHTML = `
        <div class="analysis-details space-y-6">
            <!-- Criticidade -->
            <div class="detail-section">
                <h4 class="detail-title">
                    <i class="fas fa-exclamation-triangle mr-2"></i>
                    Nível de Criticidade
                </h4>
                <div class="criticality-badge-large ${criticityColor}">
                    <i class="fas ${criticityIcon} mr-2"></i>
                    ${analysis.critico}
                </div>
            </div>
            
            <!-- Resumo -->
            <div class="detail-section">
                <h4 class="detail-title">
                    <i class="fas fa-file-text mr-2"></i>
                    Resumo da Análise
                </h4>
                <p class="detail-content">${analysis.resumo || 'Não disponível'}</p>
            </div>
            
            <!-- MITRE ATT&CK -->
            <div class="detail-section">
                <h4 class="detail-title">
                    <i class="fas fa-shield-alt mr-2"></i>
                    Categoria MITRE ATT&CK
                </h4>
                <div class="mitre-badge">
                    ${analysis.categoria_mitre || 'Não identificada'}
                </div>
            </div>
            
            <!-- Impacto -->
            <div class="detail-section">
                <h4 class="detail-title">
                    <i class="fas fa-impact mr-2"></i>
                    Estimativa de Impacto
                </h4>
                <p class="detail-content">${analysis.impacto || 'Não avaliado'}</p>
            </div>
            
            <!-- Campos Importantes -->
            <div class="detail-section">
                <h4 class="detail-title">
                    <i class="fas fa-list mr-2"></i>
                    Campos Importantes
                </h4>
                <div class="fields-list">
                    ${Array.isArray(analysis.campos) ? 
                        analysis.campos.map(campo => `<span class="field-tag">${campo}</span>`).join('') :
                        '<span class="text-gray-400">Nenhum campo identificado</span>'
                    }
                </div>
            </div>
            
            <!-- Ações Recomendadas -->
            <div class="detail-section">
                <h4 class="detail-title">
                    <i class="fas fa-tasks mr-2"></i>
                    Ações Recomendadas
                </h4>
                <div class="actions-list">
                    ${Array.isArray(analysis.acoes) ? 
                        analysis.acoes.map(acao => `
                            <div class="action-item">
                                <i class="fas fa-arrow-right mr-2 text-blue-400"></i>
                                ${acao}
                            </div>
                        `).join('') :
                        '<div class="text-gray-400">Nenhuma ação específica recomendada</div>'
                    }
                </div>
            </div>
            
            <!-- Referências -->
            <div class="detail-section">
                <h4 class="detail-title">
                    <i class="fas fa-link mr-2"></i>
                    Referências de Threat Intelligence
                </h4>
                <p class="detail-content">${analysis.referencias || 'Nenhuma referência adicional'}</p>
            </div>
            
            <!-- Contexto -->
            <div class="detail-section">
                <h4 class="detail-title">
                    <i class="fas fa-chart-line mr-2"></i>
                    Contexto e Padrões
                </h4>
                <p class="detail-content">${analysis.contexto || 'Nenhum padrão específico identificado'}</p>
            </div>
        </div>
    `;
}

// Obter classe CSS para score do CVE
function getCVEScoreClass(score) {
    if (score >= 9.0) return 'critical';
    if (score >= 7.0) return 'high';
    if (score >= 4.0) return 'medium';
    return 'low';
}

// Mostrar detalhes da detecção
function showDetectionDetails(detectionId) {
    const modal = document.getElementById('detectionModal');
    const modalTitle = document.getElementById('detectionModalTitle');
    const modalBody = document.getElementById('detectionModalBody');
    
    const detections = {
        'ip-malicious': {
            title: '185.220.101.182',
            type: 'IP Address',
            country: 'Rússia',
            reports: 847,
            confidence: 95,
            sources: {
                abuseipdb: {
                    status: 'Malicious',
                    reports: 847,
                    categories: ['Botnet', 'Malware C2', 'Brute Force'],
                    lastSeen: '2024-01-15 14:32:18'
                },
                virustotal: {
                    status: 'Malicious',
                    detections: '45/89',
                    categories: ['Trojan', 'Botnet'],
                    lastSeen: '2024-01-15 12:15:42'
                },
                misp: {
                    status: 'Known IOC',
                    events: 23,
                    tags: ['APT28', 'Tor-Exit-Node'],
                    lastSeen: '2024-01-15 10:45:33'
                }
            },
            recommendations: [
                'Bloquear imediatamente este IP em todos os firewalls',
                'Verificar logs de conexão para este IP nas últimas 48h',
                'Implementar monitoramento contínuo para esta subnet',
                'Reportar atividade suspeita para autoridades competentes'
            ]
        },
        'hash-malicious': {
            title: 'a1b2c3d4e5f6789...',
            type: 'SHA256 Hash',
            malware: 'Emotet Banking Trojan',
            reports: 23,
            confidence: 88,
            sources: {
                virustotal: {
                    status: 'Malicious',
                    detections: '67/89',
                    categories: ['Banking Trojan', 'Credential Stealer'],
                    lastSeen: '2024-01-15 09:22:15'
                },
                hybrid: {
                    status: 'Malicious',
                    score: 100,
                    behaviors: ['Network Communication', 'Registry Modification'],
                    lastSeen: '2024-01-15 08:15:30'
                }
            },
            recommendations: [
                'Executar varredura completa em todos os endpoints',
                'Verificar comunicações de rede suspeitas',
                'Implementar regras de detecção para esta família',
                'Atualizar assinaturas de antivírus'
            ]
        },
        'url-suspicious': {
            title: 'secure-bank-login.tk',
            type: 'URL',
            category: 'Phishing Banking',
            reports: 156,
            confidence: 92,
            sources: {
                phishtank: {
                    status: 'Verified Phish',
                    reports: 89,
                    target: 'Banking Institution',
                    lastSeen: '2024-01-15 11:30:45'
                },
                openphish: {
                    status: 'Active Phish',
                    reports: 45,
                    category: 'Financial',
                    lastSeen: '2024-01-15 10:22:18'
                },
                urlvoid: {
                    status: 'Malicious',
                    detections: '8/12',
                    risk: 'High',
                    lastSeen: '2024-01-15 09:45:12'
                }
            },
            recommendations: [
                'Bloquear acesso a este domínio em proxies/firewalls',
                'Implementar filtros de email para este domínio',
                'Treinar usuários sobre phishing bancário',
                'Monitorar tentativas de acesso a este site'
            ]
        }
    };
    
    const detection = detections[detectionId];
    if (!detection) return;
    
    modalTitle.textContent = detection.title;
    
    modalBody.innerHTML = `
        <div class="detection-details space-y-6">
            <!-- Informações Gerais -->
            <div class="detail-section">
                <h4 class="detail-title">
                    <i class="fas fa-info-circle mr-2"></i>
                    Informações Gerais
                </h4>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <span class="text-gray-400">Tipo:</span>
                        <span class="text-white ml-2">${detection.type}</span>
                    </div>
                    ${detection.country ? `
                    <div>
                        <span class="text-gray-400">País:</span>
                        <span class="text-white ml-2">${detection.country}</span>
                    </div>
                    ` : ''}
                    ${detection.malware ? `
                    <div>
                        <span class="text-gray-400">Malware:</span>
                        <span class="text-white ml-2">${detection.malware}</span>
                    </div>
                    ` : ''}
                    ${detection.category ? `
                    <div>
                        <span class="text-gray-400">Categoria:</span>
                        <span class="text-white ml-2">${detection.category}</span>
                    </div>
                    ` : ''}
                    <div>
                        <span class="text-gray-400">Reports:</span>
                        <span class="text-white ml-2">${detection.reports}</span>
                    </div>
                    <div>
                        <span class="text-gray-400">Confiança:</span>
                        <span class="text-white ml-2">${detection.confidence}%</span>
                    </div>
                </div>
            </div>
            
            <!-- Análise das Fontes -->
            <div class="detail-section">
                <h4 class="detail-title">
                    <i class="fas fa-database mr-2"></i>
                    Análise das Fontes
                </h4>
                <div class="sources-analysis space-y-4">
                    ${Object.entries(detection.sources).map(([source, data]) => `
                        <div class="source-analysis-card">
                            <div class="source-header">
                                <span class="source-name">${source.toUpperCase()}</span>
                                <span class="source-status-badge ${data.status.toLowerCase().replace(' ', '-')}">${data.status}</span>
                            </div>
                            <div class="source-details">
                                ${data.reports ? `<div><span class="text-gray-400">Reports:</span> <span class="text-white">${data.reports}</span></div>` : ''}
                                ${data.detections ? `<div><span class="text-gray-400">Detections:</span> <span class="text-white">${data.detections}</span></div>` : ''}
                                ${data.score ? `<div><span class="text-gray-400">Score:</span> <span class="text-white">${data.score}/100</span></div>` : ''}
                                ${data.events ? `<div><span class="text-gray-400">Events:</span> <span class="text-white">${data.events}</span></div>` : ''}
                                <div><span class="text-gray-400">Last Seen:</span> <span class="text-white">${data.lastSeen}</span></div>
                            </div>
                            ${data.categories ? `
                            <div class="source-tags">
                                ${data.categories.map(cat => `<span class="source-tag">${cat}</span>`).join('')}
                            </div>
                            ` : ''}
                            ${data.tags ? `
                            <div class="source-tags">
                                ${data.tags.map(tag => `<span class="source-tag">${tag}</span>`).join('')}
                            </div>
                            ` : ''}
                            ${data.behaviors ? `
                            <div class="source-tags">
                                ${data.behaviors.map(behavior => `<span class="source-tag">${behavior}</span>`).join('')}
                            </div>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <!-- Recomendações -->
            <div class="detail-section">
                <h4 class="detail-title">
                    <i class="fas fa-tasks mr-2"></i>
                    Recomendações de Resposta
                </h4>
                <div class="actions-list">
                    ${detection.recommendations.map(rec => `
                        <div class="action-item">
                            <i class="fas fa-arrow-right mr-2 text-blue-400"></i>
                            ${rec}
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
}

// Configurar modal de detecção
function setupDetectionModal() {
    const modal = document.getElementById('detectionModal');
    const closeBtn = document.getElementById('closeDetectionModal');
    const overlay = modal?.querySelector('.modal-overlay');
    
    if (closeBtn) {
        closeBtn.onclick = () => modal.classList.add('hidden');
    }
    
    if (overlay) {
        overlay.onclick = () => modal.classList.add('hidden');
    }
    
    // Fechar com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            modal.classList.add('hidden');
        }
    });
}

// Configurar modal de análise
function setupAnalysisModal() {
    const modal = document.getElementById('analysisModal');
    const closeBtn = document.getElementById('closeModal');
    const overlay = modal?.querySelector('.modal-overlay');
    
    if (closeBtn) {
        closeBtn.onclick = () => modal.classList.add('hidden');
    }
    
    if (overlay) {
        overlay.onclick = () => modal.classList.add('hidden');
    }
    
    // Fechar com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            modal.classList.add('hidden');
        }
    });
}

// Configurar chat IA
function setupChat() {
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');
    
    if (!messageInput || !sendButton || !chatMessages) return;
    
    // Enviar mensagem ao clicar no botão
    sendButton.addEventListener('click', sendMessage);
    
    // Enviar mensagem ao pressionar Enter
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    function sendMessage() {
        const message = messageInput.value.trim();
        
        if (message === '') return;
        
        // Adicionar mensagem do usuário
        addMessage(message, 'user');
        
        // Limpar input
        messageInput.value = '';
        
        // Simular resposta da IA após um breve delay
        setTimeout(() => {
            // Resposta simples baseada em palavras-chave
            let response = 'Obrigado pela sua mensagem. Como assistente de segurança, posso ajudar a analisar logs, explicar vulnerabilidades ou sugerir medidas de proteção.';
            
            if (message.toLowerCase().includes('log')) {
                response = 'Para análise de logs, recomendo fazer o upload do arquivo na página Dashboard. Posso ajudar a interpretar os resultados após a análise.';
            } else if (message.toLowerCase().includes('vulnerabilidade')) {
                response = 'Vulnerabilidades são falhas em sistemas que podem ser exploradas por atacantes. Recomendo manter todos os softwares atualizados e realizar varreduras regulares de segurança.';
            } else if (message.toLowerCase().includes('ataque')) {
                response = 'Ataques cibernéticos podem variar desde phishing até exploits avançados. Nossa plataforma monitora continuamente para detectar padrões suspeitos. Verifique a seção de ameaças ativas no dashboard.';
            } else if (message.toLowerCase().includes('senha') || message.toLowerCase().includes('password')) {
                response = 'Para políticas de senha, recomendo: mínimo de 12 caracteres, uso de maiúsculas, minúsculas, números e símbolos. Evite reutilizar senhas entre serviços.';
            }
            
            addMessage(response, 'ai');
            
            // Rolagem automática para a última mensagem
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
    }
    
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `message-${sender}`);
        
        if (sender === 'ai') {
            messageDiv.innerHTML = `
                <div class="message-header">
                    <i class="fas fa-robot"></i> Assistente de Segurança
                </div>
                <p>${text}</p>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-header">
                    <i class="fas fa-user"></i> Você
                </div>
                <p>${text}</p>
            `;
        }
        
        chatMessages.appendChild(messageDiv);
        
        // Rolagem automática para a última mensagem
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// Configurar responsividade da sidebar
function setupSidebarResponsive() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    
    if (sidebarToggle && sidebar && mainContent) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('sidebar-collapsed');
            
            // Alterar ícone
            const icon = sidebarToggle.querySelector('i');
            if (sidebar.classList.contains('collapsed')) {
                icon.classList.remove('fa-chevron-left');
                icon.classList.add('fa-chevron-right');
            } else {
                icon.classList.remove('fa-chevron-right');
                icon.classList.add('fa-chevron-left');
            }
        });
    }
    
    // Fechar sidebar ao clicar fora em dispositivos móveis
    document.addEventListener('click', function(e) {
        if (window.innerWidth < 768 && sidebar && !sidebar.contains(e.target) && 
            e.target !== sidebarToggle && !sidebarToggle.contains(e.target) &&
            !sidebar.classList.contains('collapsed')) {
            sidebar.classList.add('collapsed');
            mainContent.classList.add('sidebar-collapsed');
            
            // Atualizar ícone
            const icon = sidebarToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-chevron-left');
                icon.classList.add('fa-chevron-right');
            }
        }
    });
}

// Função para simular análise de arquivo (para demonstração)
function simulateFileAnalysis(file) {
    console.log(`Simulando análise do arquivo: ${file.name}`);
    
    // Simular processamento
    const analysisResults = {
        score: Math.floor(Math.random() * 40) + 60, // Score entre 60-100
        vulnerabilities: Math.floor(Math.random() * 10),
        threats: Math.floor(Math.random() * 5),
        anomalies: Math.floor(Math.random() * 15)
    };
    
    return analysisResults;
}

// Função para gerar relatório em PDF (simulação)
function generatePDFReport(filename, data) {
    console.log(`Gerando relatório PDF para: ${filename}`);
    // Em uma implementação real, isso geraria um PDF com os dados de análise
    return `https://api.cybersec.com/reports/${filename}.pdf`;
}

// Função para exportar dados (simulação)
function exportData(format) {
    console.log(`Exportando dados no formato: ${format}`);
    // Em uma implementação real, isso prepararia os dados para exportação
    return true;
}

// Manipulador de erros global
window.addEventListener('error', function(e) {
    console.error('Erro na aplicação:', e.error);
    // Em produção, você poderia enviar isso para um serviço de monitoramento
});

// Inicializar tooltips (se estiver usando alguma biblioteca)
function initTooltips() {
    // Implementação de tooltips poderia ser adicionada aqui
    // Exemplo com tippy.js ou biblioteca similar
}

// Funções utilitárias para formatação
function formatDate(date) {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Gerenciamento de tema (claro/escuro)
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-theme');
            const icon = themeToggle.querySelector('i');
            if (document.body.classList.contains('light-theme')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                localStorage.setItem('theme', 'light');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                localStorage.setItem('theme', 'dark');
            }
        });
    }
    
    // Carregar tema salvo
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }
}

// Verificar conexão com a internet
function setupOnlineStatus() {
    window.addEventListener('online', function() {
        showNotification('Conexão restaurada', 'success');
    });
    
    window.addEventListener('offline', function() {
        showNotification('Conexão perdida. Algumas funcionalidades podem não estar disponíveis.', 'warning');
    });
}

// Mostrar notificações
function showNotification(message, type = 'info') {
    // Implementação de sistema de notificações
    console.log(`[${type}] ${message}`);
    // Em uma implementação real, isso mostraria uma notificação na UI
}

// Inicializar todas as funcionalidades quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    initApp();
    setupThemeToggle();
    setupOnlineStatus();
    initTooltips();
});