# Jenkins Build Pipeline Documentation
### Deploying Zomato Clone on EC2 using Freestyle Jobs

**Project:** Zomato Clone CI/CD Pipeline  
**Docker Image:** `iamtejas23/zomato-clone`  
**Server:** Amazon Linux 2 EC2 (same machine as Jenkins)  
**App Port:** 3000  
**Date:** April 2026

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Prerequisites](#2-prerequisites)
3. [Step 1 — Install Build Pipeline Plugin](#3-step-1--install-build-pipeline-plugin)
4. [Step 2 — Create Job 1: zomato-env](#4-step-2--create-job-1-zomato-env)
5. [Step 3 — Create Job 2: zomato-docker-build-and-push](#5-step-3--create-job-2-zomato-docker-build-and-push)
6. [Step 4 — Create Job 3: zomato-deploy](#6-step-4--create-job-3-zomato-deploy)
7. [Step 5 — Chain Jobs with Post-Build Actions](#7-step-5--chain-jobs-with-post-build-actions)
8. [Step 6 — Create the Pipeline View](#8-step-6--create-the-pipeline-view)
9. [Step 7 — EC2 Setup Checklist](#9-step-7--ec2-setup-checklist)
10. [Step 8 — Run the Pipeline](#10-step-8--run-the-pipeline)
11. [Common Mistakes & Fixes](#11-common-mistakes--fixes)
12. [Quick Reference Card](#12-quick-reference-card)

---

## 1. Architecture Overview

### What We Are Building

A 3-stage automated deployment pipeline where each Jenkins job triggers the next one automatically on success.

```
┌─────────────────────────────────────────────────────────────────┐
│                    JENKINS BUILD PIPELINE VIEW                  │
│                                                                 │
│  ┌──────────────┐    triggers    ┌──────────────┐    triggers   │
│  │   Job 1      │ ─────────────► │   Job 2      │ ────────────► │
│  │  zomato-env  │                │ zomato-docker│               │
│  │              │                │ -build-and-  │               │
│  │ Sets env     │                │    push      │               │
│  │ variables    │                │              │               │
│  │ Logs build   │                │ Pulls Docker │               │
│  │ info         │                │ image from   │               │
│  └──────────────┘                │ Docker Hub   │               │
│         ✅ Pass                  └──────────────┘               │
│         ❌ Stop                        ✅ Pass                  │
│                                        ❌ Stop                  │
└────────────────────────────────────────────────────────────────►│
                                                                  │
  ┌──────────────────────────────────────────────────────────┐    │
  │   Job 3: zomato-deploy                                   │◄───┘
  │                                                          │
  │   1. Stop & remove old container (if exists)             │
  │   2. Pull fresh image                                    │
  │   3. Run container on port 3000                          │
  │   4. Verify container is running                         │
  └──────────────────────────────────────────────────────────┘
                            │
                            ▼
              http://YOUR_EC2_PUBLIC_IP:3000
```

### Flow Summary

```
Developer clicks "Run"
        │
        ▼
   [Job 1: ENV]          ← Logs environment info
        │ SUCCESS
        ▼
   [Job 2: DOCKER]       ← Pulls iamtejas23/zomato-clone from Docker Hub
        │ SUCCESS
        ▼
   [Job 3: DEPLOY]       ← Stops old container → Runs new container
        │
        ▼
   App live on port 3000 🚀
```

---

## 2. Prerequisites

Before starting, make sure these are ready:

| Requirement | Status | Notes |
|-------------|--------|-------|
| Jenkins installed on EC2 | Required | Running on Amazon Linux 2 |
| EC2 Security Group Port 3000 open | Required | Inbound: Custom TCP, Port 3000, Source 0.0.0.0/0 |
| EC2 Security Group Port 8080 open | Required | For Jenkins UI access |
| Internet access from EC2 | Required | To pull Docker image from Docker Hub |
| Jenkins user has sudo access | Required | To run Docker commands |

### Verify Jenkins is Running

```bash
# On your EC2 terminal
sudo systemctl status jenkins
# Should show: Active: active (running)
```

---

## 3. Step 1 — Install Build Pipeline Plugin

The "Build Pipeline" plugin adds the visual pipeline view to Jenkins. Without it, you only get individual job pages.

### How to Install

```
Jenkins Dashboard
    └── Manage Jenkins
            └── Manage Plugins
                    └── Available tab
                            └── Search: "Build Pipeline"
                                    └── ✅ Check → Install without restart
```

### Verify Installation

After installing, go back to the Jenkins Dashboard. You should now see a **"+"** tab next to the "All" tab. This is where you will create the Pipeline View.

```
Jenkins Dashboard Tabs (before plugin):
┌──────┐
│ All  │
└──────┘

Jenkins Dashboard Tabs (after plugin):
┌──────┬───┐
│ All  │ + │  ← New tab appears here
└──────┴───┘
```

> **Note:** If you don't see the "+" tab after install, try a full browser refresh (Ctrl+Shift+R).

---

## 4. Step 2 — Create Job 1: `zomato-env`

**Purpose:** This is the first job in the chain. It prints environment info and confirms the build is starting. Think of it as a "pre-flight check."

### Create the Job

```
Jenkins Dashboard → New Item
    ├── Name: zomato-env
    ├── Type: Freestyle project
    └── Click OK
```

### Configure: Execute Shell

Under **Build → Add build step → Execute shell**, paste this script:

```bash
#!/bin/bash
echo "========== Setting up environment =========="
echo "App Name: zomato-clone"
echo "Docker Image: iamtejas23/zomato-clone"
echo "Port: 3000"
echo "Build started at: $(date)"
echo "Jenkins Node: $(hostname)"
echo "Triggered by: Jenkins Pipeline"
echo "============================================="
```

### What This Job Does

```
Job 1 Execution Flow:
┌─────────────────────────────────────┐
│ Execute Shell                       │
│                                     │
│ • Print app name                    │
│ • Print Docker image name           │
│ • Print port number                 │
│ • Print build timestamp             │
│ • Print EC2 hostname                │
└─────────────────────────────────────┘
         │
         │ SUCCESS → triggers Job 2
         │ FAILURE → pipeline stops here
         ▼
```

Click **Save**.

---

## 5. Step 3 — Create Job 2: `zomato-docker-build-and-push`

**Purpose:** Install Docker if not present, then pull the `iamtejas23/zomato-clone` image from Docker Hub.

### Create the Job

```
Jenkins Dashboard → New Item
    ├── Name: zomato-docker-build-and-push
    ├── Type: Freestyle project
    └── Click OK
```

### Configure: Execute Shell

Under **Build → Add build step → Execute shell**, paste this script:

```bash
#!/bin/bash
echo "========== Docker Build & Pull =========="

# Check if Docker is installed; install if not
if ! command -v docker &> /dev/null; then
    echo "Docker not found! Installing..."
    sudo yum update -y
    sudo yum install -y docker
    sudo systemctl start docker
    sudo systemctl enable docker
    sudo usermod -aG docker jenkins
    echo "Docker installed successfully."
    echo "NOTE: You may need to restart Jenkins for group permissions to apply."
fi

echo "Docker version: $(docker --version)"

# Pull the latest image from Docker Hub
echo "Pulling image: iamtejas23/zomato-clone"
sudo docker pull iamtejas23/zomato-clone:latest

# Verify image was pulled successfully
echo "Image pulled successfully:"
sudo docker images | grep zomato-clone

echo "========== Done =========="
```

### Configure: Post-Build Action (IMPORTANT)

This is what chains Job 2 → Job 3.

```
Post-build Actions → Add post-build action
    └── Build other projects
            ├── Project to build: zomato-deploy
            └── Trigger only if build is stable ✅
```

### What This Job Does

```
Job 2 Execution Flow:
┌──────────────────────────────────────────────────┐
│ Execute Shell                                    │
│                                                  │
│ Is Docker installed?                             │
│     ├── NO  → Install Docker via yum             │
│     │         Start & enable Docker service      │
│     │         Add jenkins user to docker group   │
│     └── YES → Skip installation                  │
│                                                  │
│ docker pull iamtejas23/zomato-clone:latest       │
│ Verify image exists in local registry            │
└──────────────────────────────────────────────────┘
         │
         │ SUCCESS → triggers Job 3 (via Post-build Action)
         │ FAILURE → pipeline stops here
         ▼
```

Click **Save**.

---

## 6. Step 4 — Create Job 3: `zomato-deploy`

**Purpose:** This is the deployment job. It stops the old container (if any), pulls a fresh image, and starts a new container on port 3000.

### Create the Job

```
Jenkins Dashboard → New Item
    ├── Name: zomato-deploy
    ├── Type: Freestyle project
    └── Click OK
```

### Configure: Execute Shell

Under **Build → Add build step → Execute shell**, paste this script:

```bash
#!/bin/bash
echo "========== Starting Deployment =========="

CONTAINER_NAME="zomato-clone"
IMAGE_NAME="iamtejas23/zomato-clone:latest"
HOST_PORT=3000
CONTAINER_PORT=3000

# Step 1: Stop old container if running
echo "Checking for existing container..."
if sudo docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    echo "Found existing container. Stopping and removing..."
    sudo docker stop ${CONTAINER_NAME}
    sudo docker rm ${CONTAINER_NAME}
    echo "Old container removed."
else
    echo "No existing container found. Fresh deployment."
fi

# Step 2: Remove dangling images to save disk space
echo "Cleaning up dangling images..."
sudo docker image prune -f

# Step 3: Pull latest image
echo "Pulling latest image..."
sudo docker pull ${IMAGE_NAME}

# Step 4: Run the new container
echo "Starting new container..."
sudo docker run -d \
    --name ${CONTAINER_NAME} \
    -p ${HOST_PORT}:${CONTAINER_PORT} \
    --restart unless-stopped \
    ${IMAGE_NAME}

# Step 5: Verify it's running
sleep 3
if sudo docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    echo "SUCCESS! Container is running."
    echo "App available at: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):${HOST_PORT}"
    sudo docker ps | grep ${CONTAINER_NAME}
else
    echo "FAILED! Container did not start. Showing logs:"
    sudo docker logs ${CONTAINER_NAME}
    exit 1
fi

echo "========== Deployment Complete =========="
```

### What This Job Does

```
Job 3 Execution Flow:
┌─────────────────────────────────────────────────────┐
│ Execute Shell                                       │
│                                                     │
│  Does container "zomato-clone" already exist?       │
│      ├── YES → docker stop zomato-clone             │
│      │         docker rm zomato-clone               │
│      └── NO  → Skip (fresh deploy)                  │
│                                                     │
│  docker image prune -f    (clean up old layers)     │
│                                                     │
│  docker pull iamtejas23/zomato-clone:latest         │
│                                                     │
│  docker run -d                                      │
│      --name zomato-clone                            │
│      -p 3000:3000                                   │
│      --restart unless-stopped                       │
│      iamtejas23/zomato-clone:latest                 │
│                                                     │
│  sleep 3 seconds...                                 │
│                                                     │
│  Is container running?                              │
│      ├── YES → Print public IP + port ✅             │
│      └── NO  → Print logs + exit 1 ❌               │
└─────────────────────────────────────────────────────┘
         │
         ▼
    http://EC2_IP:3000  🚀
```

> **Note:** The `--restart unless-stopped` flag means the container will automatically start again if EC2 reboots, unless you manually stop it.

Click **Save**.

---

## 7. Step 5 — Chain Jobs with Post-Build Actions

Now set up Job 1 to trigger Job 2. (Job 2 → Job 3 was already configured in Step 3.)

### Edit Job 1 (`zomato-env`)

```
Jenkins Dashboard
    └── Click zomato-env
            └── Configure
                    └── Post-build Actions
                            └── Add post-build action
                                    └── Build other projects
                                            ├── Projects to build: zomato-docker-build-and-push
                                            └── Trigger only if build is stable ✅
```

Click **Save**.

### Verify the Chain

The complete chain should now be:

```
zomato-env
    │ (Post-build: Build other projects)
    ▼
zomato-docker-build-and-push
    │ (Post-build: Build other projects)
    ▼
zomato-deploy
    │
    ▼
  App running on port 3000
```

To verify: open each job's configuration and confirm the Post-build Action is set correctly.

---

## 8. Step 6 — Create the Pipeline View

This gives you the visual left-to-right pipeline board.

### Create the View

```
Jenkins Dashboard
    └── Click the "+" tab (next to "All")
            ├── View Name: Zomato Pipeline
            ├── Type: Build Pipeline View ✅
            └── Click OK
```

### Configure the View

On the configuration page that appears:

```
Build Pipeline View Settings:
┌────────────────────────────────────────┐
│ Select Initial Job: zomato-env         │  ← IMPORTANT: must be Job 1
│ No. of Displayed Builds: 5             │
│ Trigger options:                       │
│   ✅ Trigger new pipeline build        │  ← Adds a "Run" button
└────────────────────────────────────────┘
```

Click **OK**.

### What the Pipeline View Looks Like

```
ZOMATO PIPELINE VIEW
═══════════════════════════════════════════════════════

Build #  │  zomato-env  │  zomato-docker-  │  zomato-deploy
         │              │  build-and-push   │
─────────┼──────────────┼──────────────────┼──────────────
  #5     │  ✅ SUCCESS  │   ✅ SUCCESS      │  ✅ SUCCESS
  #4     │  ✅ SUCCESS  │   ✅ SUCCESS      │  ❌ FAILED
  #3     │  ✅ SUCCESS  │   ❌ FAILED       │  (not run)

                                        [Run ▶]  ← manual trigger button
```

---

## 9. Step 7 — EC2 Setup Checklist

Before running the pipeline, complete these one-time setup steps on your EC2 instance.

### Open Port 3000 in Security Group

```
AWS Console
    └── EC2 → Security Groups
            └── Select your instance's Security Group
                    └── Inbound Rules → Edit
                            └── Add Rule:
                                    ├── Type: Custom TCP
                                    ├── Port: 3000
                                    └── Source: 0.0.0.0/0
```

### Add Jenkins User to Docker Group

Run these commands on the EC2 terminal (as ec2-user):

```bash
# Add jenkins user to docker group
sudo usermod -aG docker jenkins

# Restart Jenkins to apply group change
sudo systemctl restart jenkins

# Test Docker access as jenkins user
sudo -u jenkins docker ps
# Should return an empty table, NOT "permission denied"
```

### Verify Jenkins Can Run Docker

```bash
# Switch to jenkins user and test
sudo su - jenkins -s /bin/bash
docker ps
# Should work without sudo
exit
```

---

## 10. Step 8 — Run the Pipeline

### Trigger the Pipeline

```
Go to Jenkins Dashboard
    └── Click "Zomato Pipeline" tab
            └── Click the [Run ▶] button
```

### What to Watch

```
Pipeline Execution Timeline:

00:00  ── Job 1 starts (zomato-env)
           └── Prints environment info
00:05  ── Job 1 SUCCESS ✅
           └── Triggers Job 2 automatically

00:05  ── Job 2 starts (zomato-docker-build-and-push)
           └── Checks/installs Docker
           └── Pulls iamtejas23/zomato-clone:latest
              (this may take 1-3 minutes on first run)
02:30  ── Job 2 SUCCESS ✅
           └── Triggers Job 3 automatically

02:30  ── Job 3 starts (zomato-deploy)
           └── Stops old container (if any)
           └── Pulls fresh image
           └── Starts new container on port 3000
           └── Verifies container is running
02:45  ── Job 3 SUCCESS ✅

02:45  ── 🚀 App is LIVE at http://YOUR_EC2_PUBLIC_IP:3000
```

### Verify the App is Running

```bash
# On EC2 terminal
sudo docker ps

# You should see:
# CONTAINER ID   IMAGE                          PORTS                    NAMES
# abc123def456   iamtejas23/zomato-clone:latest 0.0.0.0:3000->3000/tcp  zomato-clone
```

Then open in browser:

```
http://<YOUR_EC2_PUBLIC_IP>:3000
```

---

## 11. Common Mistakes & Fixes

### Mistake 1: "Permission denied" when running Docker

```
Error: Got permission denied while trying to connect to the Docker daemon socket
```

**Fix:**
```bash
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins
```

---

### Mistake 2: Port 3000 not accessible in browser

```
Problem: Browser shows "site can't be reached" or connection timeout
```

**Fix:** Add inbound rule in EC2 Security Group for port 3000.

```
AWS Console → EC2 → Security Groups → Inbound Rules → Edit
    └── Type: Custom TCP | Port: 3000 | Source: 0.0.0.0/0
```

---

### Mistake 3: Jobs not chaining (run independently)

```
Problem: Job 1 succeeds but Job 2 doesn't start automatically
```

**Fix:** Check Post-build Actions in each job.

```
Go to zomato-env → Configure → Post-build Actions
    └── "Build other projects" must be set to: zomato-docker-build-and-push
        with "Trigger only if build is stable" selected
```

---

### Mistake 4: Build Pipeline plugin not found

```
Problem: No "+" tab on Dashboard to create Pipeline View
```

**Fix:**
```
Manage Jenkins → Manage Plugins → Available → Search "Build Pipeline" → Install
```

---

### Mistake 5: Container port conflict

```
Error: Bind for 0.0.0.0:3000 failed: port is already allocated
```

**Fix:** The Job 3 script already handles this with `docker stop` + `docker rm`. If it still fails:

```bash
# Manually stop and remove
sudo docker stop zomato-clone
sudo docker rm zomato-clone
# Then re-run the pipeline
```

---

### Mistake 6: Pipeline View shows "No Initial Job"

```
Problem: Pipeline view is blank / says "no initial job selected"
```

**Fix:**
```
Zomato Pipeline → Edit View
    └── Select Initial Job: zomato-env ← make sure this is set
```

---

## 12. Quick Reference Card

### Job Summary

| Job | Name | Purpose | Triggers |
|-----|------|---------|---------|
| Job 1 | `zomato-env` | Print env info | → Job 2 on success |
| Job 2 | `zomato-docker-build-and-push` | Install Docker + Pull image | → Job 3 on success |
| Job 3 | `zomato-deploy` | Stop old + Run new container | End of pipeline |

### Key Docker Commands Used

```bash
# Check if container exists
docker ps -a --format '{{.Names}}' | grep -q "^zomato-clone$"

# Stop and remove old container
docker stop zomato-clone
docker rm zomato-clone

# Pull image
docker pull iamtejas23/zomato-clone:latest

# Run container
docker run -d \
    --name zomato-clone \
    -p 3000:3000 \
    --restart unless-stopped \
    iamtejas23/zomato-clone:latest

# Check running containers
docker ps

# View container logs
docker logs zomato-clone
```

### Port Mapping Explained

```
EC2 Instance (Port 3000)  ←──►  Docker Container (Port 3000)
   Your browser hits            App listens inside here
   this port                    on this port

docker run -p 3000:3000
           │      │
           │      └── Container port (internal)
           └── Host/EC2 port (external, what browser uses)
```

### Pipeline Re-Run Checklist

Every time you want to redeploy, just:

1. Go to **Zomato Pipeline** view
2. Click **[Run ▶]**
3. Watch all 3 jobs turn green
4. Visit `http://EC2_IP:3000`



---

*Documentation generated for Jenkins Build Pipeline — Zomato Clone deployment on Amazon Linux 2 EC2*
