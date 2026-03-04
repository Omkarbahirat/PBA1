import React, { useState } from 'react';
import { 
  Database, 
  Cpu, 
  Server, 
  Layers, 
  GitBranch, 
  ShieldCheck, 
  Users, 
  Activity,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Terminal,
  Workflow,
  Cloud,
  Code2,
  BarChart3
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
type Section = 'data' | 'model' | 'backend' | 'infra' | 'mlops' | 'devops' | 'output' | 'prompts';

interface Responsibility {
  role: string;
  tasks: string[];
}

// --- Components ---

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white border border-zinc-200 rounded-xl p-6 shadow-sm ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, color = "blue" }: { children: React.ReactNode; color?: string }) => {
  const colors: Record<string, string> = {
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    green: "bg-emerald-50 text-emerald-700 border-emerald-100",
    orange: "bg-orange-50 text-orange-700 border-orange-100",
    purple: "bg-purple-50 text-purple-700 border-purple-100",
    zinc: "bg-zinc-50 text-zinc-700 border-zinc-100",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${colors[color]}`}>
      {children}
    </span>
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('data');

  const responsibilities: Responsibility[] = [
    {
      role: "Backend Developer",
      tasks: [
        "Implement REST API endpoints (/upload, /predict, /train)",
        "Manage CSV-based dataset storage and versioning",
        "Integrate SQLite/Postgres for metadata tracking",
        "Handle authentication and role-based access control"
      ]
    },
    {
      role: "DL & Transformer (Train/Test)",
      tasks: [
        "Design unified training and evaluation pipelines",
        "Implement testing suites for model accuracy and robustness",
        "Manage training/validation/test splits for all models",
        "Compare metrics (RMSE vs F1) across LSTM and Transformers"
      ]
    },
    {
      role: "LSTM Specialist",
      tasks: [
        "Build sequential data preprocessing for time-series",
        "Optimize LSTM cell architectures (Hidden layers, Dropout)",
        "Handle long-term dependency challenges (Vanishing gradients)",
        "Fine-tune temporal sequence lengths for specific datasets"
      ]
    },
    {
      role: "Transformer Specialist",
      tasks: [
        "Implement Multi-Head Attention and Positional Encoding",
        "Manage tokenization and vocabulary for NLP tasks",
        "Optimize context window and memory efficiency",
        "Fine-tune pre-trained Transformer models for specific domains"
      ]
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'data':
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Database className="w-5 h-5 text-blue-600" />
                  CSV Schema & Storage
                </h3>
                <p className="text-sm text-zinc-600 mb-4">
                  We utilize a <strong>Versioned CSV Lake</strong> approach. Each dataset is stored in an S3-compatible bucket with a strictly enforced schema.
                </p>
                <div className="bg-zinc-50 p-3 rounded-lg font-mono text-xs space-y-1 border border-zinc-200">
                  <div className="text-zinc-400"># Schema Definition</div>
                  <div>timestamp: ISO8601 (Primary Index)</div>
                  <div>feature_id: UUID</div>
                  <div>payload: JSON_STRING (Dynamic features)</div>
                  <div>label: FLOAT/INT</div>
                  <div>version_tag: SEMVER</div>
                </div>
              </Card>
              <Card>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Workflow className="w-5 h-5 text-blue-600" />
                  Ingestion Pipeline
                </h3>
                <ul className="space-y-3 text-sm text-zinc-600">
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span><strong>Validation:</strong> Pydantic-based schema checks on upload.</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span><strong>Transformation:</strong> Spark jobs for normalization and null-handling.</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span><strong>Versioning:</strong> DVC (Data Version Control) tracks hash-based snapshots.</span>
                  </li>
                </ul>
              </Card>
            </div>
            <Card className="bg-blue-50/30 border-blue-100">
              <h4 className="text-sm font-bold text-blue-900 uppercase tracking-widest mb-2">Evolution Strategy</h4>
              <p className="text-sm text-blue-800">
                Datasets evolve via "Append-Only" logic with a <strong>Schema Registry</strong>. Breaking changes trigger a new major version in the ML pipeline, ensuring backward compatibility for legacy models.
              </p>
            </Card>
          </motion.div>
        );
      case 'model':
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Activity className="w-5 h-5 text-purple-600" />
                    LSTM (Sequential)
                  </h3>
                  <Badge color="purple">Time-Series</Badge>
                </div>
                <p className="text-sm text-zinc-600 mb-4">
                  Optimized for strictly ordered data where the <strong>recurrent state</strong> is vital for capturing long-term dependencies in sensor data or financial logs.
                </p>
                <div className="text-xs space-y-2">
                  <div className="flex justify-between border-b border-zinc-100 pb-1">
                    <span className="text-zinc-500">Metric</span>
                    <span className="font-medium">RMSE / MAE</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-100 pb-1">
                    <span className="text-zinc-500">Split</span>
                    <span className="font-medium">70/15/15 (Temporal)</span>
                  </div>
                </div>
              </Card>
              <Card>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-orange-600" />
                    Transformer (Contextual)
                  </h3>
                  <Badge color="orange">NLP / Global</Badge>
                </div>
                <p className="text-sm text-zinc-600 mb-4">
                  Utilizes <strong>Multi-Head Attention</strong> to capture global context. Preferable when sequence order is secondary to semantic relationships.
                </p>
                <div className="text-xs space-y-2">
                  <div className="flex justify-between border-b border-zinc-100 pb-1">
                    <span className="text-zinc-500">Metric</span>
                    <span className="font-medium">F1-Score / BLEU</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-100 pb-1">
                    <span className="text-zinc-500">Split</span>
                    <span className="font-medium">80/10/10 (Random)</span>
                  </div>
                </div>
              </Card>
            </div>
            <Card>
              <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-widest mb-4">Hyperparameter Strategy</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="p-3 bg-zinc-50 rounded-lg">
                  <div className="font-bold text-zinc-700">Bayesian Opt</div>
                  <div className="text-xs text-zinc-500 mt-1">Efficiently explores the parameter space using Optuna.</div>
                </div>
                <div className="p-3 bg-zinc-50 rounded-lg">
                  <div className="font-bold text-zinc-700">Early Stopping</div>
                  <div className="text-xs text-zinc-500 mt-1">Prevents overfitting by monitoring validation loss.</div>
                </div>
                <div className="p-3 bg-zinc-50 rounded-lg">
                  <div className="font-bold text-zinc-700">LR Scheduling</div>
                  <div className="text-xs text-zinc-500 mt-1">Cosine annealing with warm restarts for convergence.</div>
                </div>
              </div>
            </Card>
          </motion.div>
        );
      case 'backend':
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Card>
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Server className="w-5 h-5 text-emerald-600" />
                API Gateway & Service Layer
              </h3>
              <div className="space-y-4">
                {[
                  { path: "/upload-dataset", method: "POST", desc: "Multipart upload with schema validation." },
                  { path: "/train-model", method: "POST", desc: "Triggers async training job (Returns JobID)." },
                  { path: "/predict", method: "POST", desc: "Low-latency inference endpoint." },
                  { path: "/evaluate", method: "GET", desc: "Retrieves model performance metrics." }
                ].map((api, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border border-zinc-100 rounded-lg hover:bg-zinc-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold px-2 py-1 bg-emerald-100 text-emerald-700 rounded">{api.method}</span>
                      <code className="text-sm font-bold text-zinc-800">{api.path}</code>
                    </div>
                    <span className="text-xs text-zinc-500">{api.desc}</span>
                  </div>
                ))}
              </div>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-widest mb-3">Auth & Security</h4>
                <ul className="text-sm text-zinc-600 space-y-2">
                  <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-500" /> JWT-based Authentication</li>
                  <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-500" /> RBAC (Admin, DataScientist, Viewer)</li>
                  <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-500" /> API Rate Limiting (Redis)</li>
                </ul>
              </Card>
              <Card>
                <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-widest mb-3">Async Processing</h4>
                <p className="text-sm text-zinc-600">
                  Training jobs are offloaded to <strong>Celery workers</strong> with <strong>Redis</strong> as the broker. This prevents API timeouts and allows horizontal scaling of workers.
                </p>
              </Card>
            </div>
          </motion.div>
        );
      case 'infra':
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Card className="bg-zinc-900 text-white border-none">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Cloud className="w-5 h-5 text-blue-400" />
                Cloud Infrastructure (K8s)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="text-blue-400 font-bold text-xs uppercase">Compute</div>
                  <div className="text-sm">GKE / EKS with GPU Node Pools (A100/H100)</div>
                </div>
                <div className="space-y-2">
                  <div className="text-blue-400 font-bold text-xs uppercase">Storage</div>
                  <div className="text-sm">Persistent Volumes (SSD) for Model Weights</div>
                </div>
                <div className="space-y-2">
                  <div className="text-blue-400 font-bold text-xs uppercase">Networking</div>
                  <div className="text-sm">Istio Service Mesh for mTLS and Traffic Splitting</div>
                </div>
              </div>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-widest mb-3">Containerization</h4>
                <div className="bg-zinc-50 p-3 rounded-lg font-mono text-[10px] text-zinc-700 border border-zinc-200">
                  <div>FROM nvidia/cuda:12.1-base</div>
                  <div>RUN pip install torch transformers celery</div>
                  <div>COPY ./src /app</div>
                  <div>ENTRYPOINT ["celery", "-A", "tasks", "worker"]</div>
                </div>
              </Card>
              <Card>
                <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-widest mb-3">Scaling Strategy</h4>
                <p className="text-sm text-zinc-600">
                  <strong>Horizontal Pod Autoscaler (HPA)</strong> scales inference pods based on CPU/Memory. Training pods use <strong>Kubernetes Jobs</strong> for ephemeral, high-compute workloads.
                </p>
              </Card>
            </div>
          </motion.div>
        );
      case 'mlops':
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-l-4 border-l-blue-500">
                <h4 className="text-xs font-bold text-zinc-400 uppercase mb-2">Experiment Tracking</h4>
                <div className="text-lg font-bold text-zinc-800">MLflow / W&B</div>
                <p className="text-xs text-zinc-500 mt-2">Logs every run, parameter, and artifact automatically.</p>
              </Card>
              <Card className="border-l-4 border-l-purple-500">
                <h4 className="text-xs font-bold text-zinc-400 uppercase mb-2">Model Registry</h4>
                <div className="text-lg font-bold text-zinc-800">Staging vs Prod</div>
                <p className="text-xs text-zinc-500 mt-2">Strict approval workflow before model promotion.</p>
              </Card>
              <Card className="border-l-4 border-l-emerald-500">
                <h4 className="text-xs font-bold text-zinc-400 uppercase mb-2">Drift Monitoring</h4>
                <div className="text-lg font-bold text-zinc-800">Evidently.ai</div>
                <p className="text-xs text-zinc-500 mt-2">Detects feature and prediction drift in real-time.</p>
              </Card>
            </div>
            <Card>
              <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-widest mb-4">Retraining Triggers</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-zinc-50 rounded-lg border border-zinc-100">
                  <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">01</div>
                  <div className="text-sm"><strong>Performance Degradation:</strong> Accuracy drops below 92% threshold.</div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-zinc-50 rounded-lg border border-zinc-100">
                  <div className="w-8 h-8 rounded bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xs">02</div>
                  <div className="text-sm"><strong>Data Volume:</strong> 100k+ new records ingested into the CSV lake.</div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-zinc-50 rounded-lg border border-zinc-100">
                  <div className="w-8 h-8 rounded bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xs">03</div>
                  <div className="text-sm"><strong>Scheduled:</strong> Weekly "Golden Model" refresh via Airflow.</div>
                </div>
              </div>
            </Card>
          </motion.div>
        );
      case 'devops':
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Card>
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-zinc-600" />
                CI/CD Pipeline Architecture
              </h3>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-zinc-200"></div>
                <div className="space-y-8">
                  {[
                    { stage: "Source", desc: "Git Commit triggers GitHub Actions / GitLab CI.", icon: <Code2 className="w-4 h-4" /> },
                    { stage: "Build", desc: "Docker image build & Push to Container Registry (ECR/GCR).", icon: <Layers className="w-4 h-4" /> },
                    { stage: "Test", desc: "Pytest for logic, PyLint for quality, Trivy for security scans.", icon: <ShieldCheck className="w-4 h-4" /> },
                    { stage: "Deploy", desc: "ArgoCD syncs K8s manifests to Staging, then Production.", icon: <ArrowRight className="w-4 h-4" /> }
                  ].map((step, i) => (
                    <div key={i} className="relative pl-10">
                      <div className="absolute left-2 w-4 h-4 rounded-full bg-white border-2 border-zinc-400 z-10 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-400"></div>
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-zinc-400">{step.icon}</span>
                        <h4 className="font-bold text-sm text-zinc-800">{step.stage}</h4>
                      </div>
                      <p className="text-xs text-zinc-500">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        );
      case 'output':
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <h3 className="text-lg font-semibold mb-4">Layered Architecture Diagram</h3>
                  <div className="bg-zinc-900 rounded-lg p-6 font-mono text-[11px] text-blue-300 leading-relaxed overflow-x-auto whitespace-pre">
{`+-------------------------------------------------------+
|                 USER INTERFACE / CLIENT               |
+---------------------------+---------------------------+
                            |
+---------------------------v---------------------------+
|                   API GATEWAY (REST)                  |
|          Auth | Rate Limiting | Load Balancing        |
+---------------------------+---------------------------+
                            |
+---------------------------v---------------------------+
|                 BACKEND SERVICES (APP)                |
|      Job Mgmt | Metadata DB | Inference Logic         |
+-------------+-------------+-------------+-------------+
              |             |             |
+-------------v-------------v-------------v-------------+
|        ML PIPELINE        |       DATA PIPELINE       |
|  LSTM Train | Transf Train |  Ingest | Valid | Version |
+-------------+-------------+-------------+-------------+
              |             |             |
+-------------v-------------v-------------v-------------+
|                 INFRASTRUCTURE LAYER                  |
|      Kubernetes | Docker | GPU Pools | S3 Storage     |
+-------------------------------------------------------+`}
                  </div>
                </Card>
                <Card>
                  <h3 className="text-lg font-semibold mb-4">Responsibility Matrix</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead>
                        <tr className="border-b border-zinc-100">
                          <th className="pb-3 font-bold text-zinc-400 uppercase text-[10px]">Role</th>
                          <th className="pb-3 font-bold text-zinc-400 uppercase text-[10px]">Core Responsibilities</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-50">
                        {responsibilities.map((r, i) => (
                          <tr key={i}>
                            <td className="py-4 font-bold text-zinc-800 align-top w-1/3">{r.role}</td>
                            <td className="py-4">
                              <ul className="space-y-1">
                                {r.tasks.map((t, j) => (
                                  <li key={j} className="text-zinc-600 flex items-center gap-2">
                                    <div className="w-1 h-1 rounded-full bg-zinc-300"></div>
                                    {t}
                                  </li>
                                ))}
                              </ul>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>
              <div className="space-y-6">
                <Card className="bg-red-50 border-red-100">
                  <h3 className="text-sm font-bold text-red-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Failure Scenarios
                  </h3>
                  <div className="space-y-4 text-xs">
                    <div>
                      <div className="font-bold text-red-800">GPU Out of Memory (OOM)</div>
                      <div className="text-red-700/70 mt-1">Mitigation: Gradient accumulation and mixed-precision training (FP16).</div>
                    </div>
                    <div>
                      <div className="font-bold text-red-800">Data Poisoning</div>
                      <div className="text-red-700/70 mt-1">Mitigation: Strict data validation and anomaly detection in ingestion.</div>
                    </div>
                    <div>
                      <div className="font-bold text-red-800">Model Stale-ness</div>
                      <div className="text-red-700/70 mt-1">Mitigation: Automated drift monitoring and retraining triggers.</div>
                    </div>
                  </div>
                </Card>
                <Card className="bg-emerald-50 border-emerald-100">
                  <h3 className="text-sm font-bold text-emerald-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    Security Considerations
                  </h3>
                  <ul className="space-y-3 text-xs text-emerald-800">
                    <li className="flex gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1 shrink-0"></div>
                      <span><strong>Data Encryption:</strong> AES-256 at rest (S3) and TLS 1.3 in transit.</span>
                    </li>
                    <li className="flex gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1 shrink-0"></div>
                      <span><strong>Network Isolation:</strong> Private VPC with no public ingress except API Gateway.</span>
                    </li>
                    <li className="flex gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1 shrink-0"></div>
                      <span><strong>Audit Logs:</strong> Full traceability of data access and model training actions.</span>
                    </li>
                  </ul>
                </Card>
              </div>
            </div>
          </motion.div>
        );
      case 'prompts':
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Card>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-blue-600" />
                Google AI Studio Prompts
              </h3>
              <p className="text-sm text-zinc-600 mb-6">
                Use these prompts in Google AI Studio to generate code for each specific role in the architecture.
              </p>
              
              <div className="space-y-6">
                <div className="p-4 bg-zinc-50 rounded-lg border border-zinc-200">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-xs font-bold text-zinc-900 uppercase">For Backend Developer</h4>
                    <Badge color="zinc">API & CSV</Badge>
                  </div>
                  <code className="text-[11px] text-zinc-700 block whitespace-pre-wrap leading-relaxed">
{`Act as a Senior Backend Engineer. Write a Node.js/Express API that:
1. Accepts CSV file uploads and saves them to a 'datasets' directory.
2. Implements a '/train' endpoint that triggers an async job.
3. Implements a '/predict' endpoint that loads a saved model.
4. Uses JWT for authentication and includes basic error handling.
Ensure the CSV ingestion validates columns: [timestamp, feature_a, feature_b, label].`}
                  </code>
                </div>

                <div className="p-4 bg-zinc-50 rounded-lg border border-zinc-200">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-xs font-bold text-zinc-900 uppercase">For DL & Transformer (Train/Test)</h4>
                    <Badge color="zinc">Pipeline</Badge>
                  </div>
                  <code className="text-[11px] text-zinc-700 block whitespace-pre-wrap leading-relaxed">
{`Act as a Machine Learning Engineer. Write a Python script using PyTorch/TensorFlow to:
1. Load a CSV dataset and split it into 80% train, 10% val, 10% test.
2. Create a generic training loop that handles both LSTM and Transformer models.
3. Calculate evaluation metrics: RMSE for regression and F1-score for classification.
4. Save the best model weights as a .pth or .h5 file.`}
                  </code>
                </div>

                <div className="p-4 bg-zinc-50 rounded-lg border border-zinc-200">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-xs font-bold text-zinc-900 uppercase">For LSTM Specialist</h4>
                    <Badge color="zinc">Sequential</Badge>
                  </div>
                  <code className="text-[11px] text-zinc-700 block whitespace-pre-wrap leading-relaxed">
{`Act as a Deep Learning Specialist. Implement a PyTorch LSTM model for time-series prediction:
1. Define a class 'TimeSeriesLSTM' with 2 hidden layers and dropout.
2. Include a method to preprocess CSV data into sliding window sequences.
3. Optimize for long-term dependencies in a dataset with 50+ time steps.
4. Explain the choice of hidden dimension and layer count.`}
                  </code>
                </div>

                <div className="p-4 bg-zinc-50 rounded-lg border border-zinc-200">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-xs font-bold text-zinc-900 uppercase">For Transformer Specialist</h4>
                    <Badge color="zinc">Attention</Badge>
                  </div>
                  <code className="text-[11px] text-zinc-700 block whitespace-pre-wrap leading-relaxed">
{`Act as an NLP Engineer. Implement a Transformer model for contextual learning:
1. Define a 'ContextualTransformer' using Multi-Head Attention.
2. Include Positional Encoding for the input sequence.
3. Write a tokenization function that prepares CSV text features for the model.
4. Optimize the attention heads and feed-forward dimension for a context window of 512 tokens.`}
                  </code>
                </div>
              </div>
            </Card>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans selection:bg-blue-100">
      {/* Header */}
      <header className="bg-white border-b border-zinc-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
              <Terminal className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight">AI NEXUS ARCHITECT</h1>
              <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-widest">System Design v2.4.0</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[10px] font-bold text-emerald-700 uppercase">Production Ready</span>
            </div>
            <Users className="w-5 h-5 text-zinc-400 cursor-pointer hover:text-zinc-600 transition-colors" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-3 space-y-1">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4 px-3">Architecture Layers</p>
            {[
              { id: 'data', label: 'Data Layer', icon: <Database className="w-4 h-4" /> },
              { id: 'model', label: 'Model Layer', icon: <Cpu className="w-4 h-4" /> },
              { id: 'backend', label: 'Backend Layer', icon: <Server className="w-4 h-4" /> },
              { id: 'infra', label: 'Infrastructure', icon: <Cloud className="w-4 h-4" /> },
              { id: 'mlops', label: 'MLOps Pipeline', icon: <BarChart3 className="w-4 h-4" /> },
              { id: 'devops', label: 'DevOps Pipeline', icon: <GitBranch className="w-4 h-4" /> },
              { id: 'prompts', label: 'AI Studio Prompts', icon: <Terminal className="w-4 h-4" /> },
              { id: 'output', label: 'Architectural Output', icon: <Layers className="w-4 h-4" /> },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as Section)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeSection === item.id 
                    ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200' 
                    : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'
                }`}
              >
                <span className={activeSection === item.id ? 'text-blue-600' : ''}>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </aside>

          {/* Main Content Area */}
          <section className="lg:col-span-9">
            <div className="mb-8">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 mb-2">
                {activeSection.charAt(0).toUpperCase() + activeSection.slice(1).replace('mlops', 'MLOps').replace('devops', 'DevOps')}
              </h2>
              <p className="text-zinc-500 text-sm max-w-2xl">
                Comprehensive design specifications for the {activeSection} of the AI Nexus platform, ensuring scalability, reliability, and enterprise-grade security.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {renderContent()}
            </AnimatePresence>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white py-8 mt-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[10px] text-zinc-400 font-medium uppercase tracking-widest">
            © 2026 AI Nexus Systems • Confidential Architectural Document
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[10px] font-bold text-zinc-500 hover:text-zinc-900 uppercase tracking-widest transition-colors">Documentation</a>
            <a href="#" className="text-[10px] font-bold text-zinc-500 hover:text-zinc-900 uppercase tracking-widest transition-colors">Security Policy</a>
            <a href="#" className="text-[10px] font-bold text-zinc-500 hover:text-zinc-900 uppercase tracking-widest transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
