# **Franklin Fu**

Seattle, WA • (781) 888‑5271 • zhenyf@uw.edu

LinkedIn: linkedin.com/in/fu-zhenyang

## **TECHNICAL SKILLS**

​Programming & Data: Python (Pandas, NumPy), LLM Evaluation & Benchmarking, API Integration, RAG, Auto-benchmarking, C/C++, MATLAB, Git/GitHub, Cursor.

​Electronics & Embedded: STM32, ESP32, Arduino, PCB Design & Prototyping, Control, Oscilloscopes, Logic Analyzers.

​Mechanical Design: SolidWorks (CSWA Certified), Fusion 360, 3D Printing (FDM/SLA), Laser Cutting, Waterjet, G-code generation, Rapid Prototyping.

​Languages: English (Professional Proficiency), Chinese (Native).

## **EDUCATION**

**University of Washington, Seattle**    
Bachelor of Science in Electrical and Computer Engineering  
Sept 2024 – Expected June 2028

## **EXPERIENCE**

### **UW Husky Robotics Drone Subsystem – Embedded Firmware Developer**

*Mar 2026 – Present*

* Brought up **BMI270 6-axis IMU** on **STM32H753ZI** (Cortex-M7, 480 MHz) using **Bosch SensorAPI** over **I2C1**, verifying chip identity and streaming calibrated accel/gyro data at **100 Hz ODR** — debugging a **SPI→I2C interface pivot** caused by a hardware COMM SEL bridge on the MikroE click board.  
* Integrated C peripheral drivers (**I2C, USART**) and ported the Bosch BMI270 SensorAPI with a **custom HAL callback layer** and **DWT-based microsecond timing**, resolving a newlib-nano float printf linker flag issue to enable sensor data readout over **USART3 VCP**.  
* Architected a **dual-board embedded system** (STM32G431KB ESC · STM32H753ZI flight controller) with **FDCAN** as the inter-board communication backbone, targeting **three-phase center-aligned PWM** via TIM1 as the foundation for a **Field-Oriented Control** motor drive pipeline.  
* Established an **AI-assisted embedded development workflow** in Cursor IDE, automating the flash-and-monitor cycle via a custom **tasks.json** using pyserial miniterm — eliminating manual port detection across board resets.

### **Zhejiang University, Binjiang Institute – Intern research assistant** 

###### *Jan 2026 \- Mar 2026*

* **Co-authored and submitted a first-author paper to MICCAI 2026** titled "Beyond Accuracy: A Tri-Dimensional Behavioral Stress Test for Uncovering Safety Risks in Small Medical LLMs."  
* **Designed and curated the Diabetes-FCT Benchmark**, a rigorous 1,020-question dataset engineered to evaluate LLM vulnerabilities including "Sycophancy Resistance" and "Exclusion Logic."  
* **Engineered an automated zero-shot evaluation pipeline in Python**, utilizing Regex parsing and local model deployment (via Ollama) to stress-test models like Llama-3.1-8B and Gemma-7B.  
* **Identified critical alignment failures** (e.g., the "Yes-Man" phenotype and the "Accuracy Paradox"), directly mapping model behavior to RLHF alignment taxes.

### **UW Solar – Project & Documentation Assistant**

*Oct 2025 – Dec 2025*

* Contributed to technical planning for solar projects, including the resiliency tunnel and SER initiatives.  
* Analyzed performance of the E18 pilot solar installation, evaluating system setup, efficiency metrics, and workflow.  
* Maintained detailed project documentation including schematics, progress logs, and evaluation reports.  
* Collaborated with team members to track milestones and identify design or installation improvements.

### **Dilipow Electronics (Changzhou) – Internationalization & Project Intern**

*Aug 2025 – Sept 2025*

* Led English‑language website localization, coordinating with engineers, translators, and developers.  
* Translated and verified technical product documentation for accuracy and clarity.  
* Developed and managed a project plan to ensure on‑time launch of the company’s first English website.

### **UW Craft² Student Research Lab – Mechanics Leader**

*Sept 2024 – May 2026*

* Designed a phone‑mounted tangible compass with vibration motors and a navigation app for users with vision disabilities.  
* Developed a wrist‑mounted rotating compass prototype enabling hands‑free tactile navigation.  
* Conducted research on human‑centered design and sensor‑based feedback systems.  
* **Presented** vibrotactile navigation system research at the **UW Undergraduate Research Symposium**, demonstrating a tangible compass prototype designed to support independent navigation for users with vision disabilities.

### **FTC Griffinators Robotics Team — Team Captain & Mechanics Leader**

*Sept 2022 – May 2024*

* Led mechanical design and autonomous system development for competition robots.  
* Integrated odometry wheels and distance sensors to improve real‑time localization and autonomous accuracy.  
* Designed mechanical components including a high‑precision robot claw, landing flaps, and an energy‑absorbing nose for competition tasks.  
* Solved servo failure issues by developing an innovative gearbox mechanism.  
* Guided team strategy and mechanical development, contributing to a **Winning Alliance** title and earning **Best Design** in MA for the 2022–2023 season.

## **PROGRAMMING & SYSTEM PROJECTS**

**HaptiNav: Haptic Navigation System for Blind & Low-Vision Pedestrians (iOS, ESP32, ARKit, BLE)** *UW Craft² Collaborative Project*

*Jan 2026 – May 2026*

* **Designed** a compact **MagSafe-compatible iPhone attachment** housing an **ESP32-S3 BLE MCU** and three directional vibration motors delivering real-time left/right/forward haptic cues for non-visual pedestrian navigation, with a **3.7 V Li-Po battery supporting 5–7 hours** of standalone operation in a slim, low-profile form factor.  
* **Built** an **iOS app using ARKit LiDAR depth data** and camera pose reconstruction to classify nearby obstacles (ground, drops, stairs, slopes) and generate an angular free-space map for real-time obstacle detection up to **5 m range**, transmitting avoidance commands to the attachment over BLE.  
* **Implemented** a **dual-layer navigation pipeline** combining **Google Maps API** for macro-level GPS routing with a local LiDAR safety layer; applied safety-first arbitration to override route guidance when obstacles are detected, ensuring collision avoidance takes priority.  
* **Presented** finalized system at the **UW Undergraduate Research Symposium (May 2026\)**, validating reliable guidance and obstacle avoidance in noisy outdoor environments.

**Automated Laser Marking System (Python, Computer Vision, Hardware Control)** *Independent Project* 

*Feb 2026 – Mar 2026*

* **Architected** an end-to-end computer vision pipeline and ESP32-controlled laser marking gantry **designed for medical laboratory automation**, localizing Eppendorf tubes to streamline sample tracking and reduce manual labeling bottlenecks.  
* **Engineered** a hybrid detection algorithm combining deep learning and geometric math to overcome low-contrast lighting failures. Utilized **YOLOv8n** to detect high-confidence anchor tubes, and applied **OpenCV** Homography matrix transformations to project a mathematically perfect 13mm x 15mm 96-well grid.  
* **Optimized** YOLO model accuracy and training efficiency by restructuring custom CVAT datasets, unifying conflicting label classes to prevent data corruption, and applying Mosaic and HSV image augmentations to improve dark-object recognition.  
* **Developed** the algorithmic bridge for hardware actuation, translating perspective-corrected physical coordinates (mm) into G-code and stepper motor pulse commands for real-time serial transmission to the ESP32 microcontroller.

