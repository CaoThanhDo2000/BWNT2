import React, { useState, useMemo, useEffect, useRef } from "react";
import { supabase } from "./supabaseClient"; // <-- THÊM DÒNG NÀY
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import {
  LayoutDashboard,
  Factory,
  Users,
  FileText,
  Settings,
  Bell,
  Search,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Warehouse,
  MoreVertical,
  X,
  Filter,
  Map,
  Calendar,
  TrendingUp,
  Download,
  ChevronDown,
  Printer,
  Lock,
  Unlock,
  Share2,
  Copy,
  LogIn,
  Eye,
  Wrench,
  Plus,
  Tag,
  Clock,
  MapPin,
  CheckSquare,
  Edit3,
  Save,
  LifeBuoy,
  MessageSquare,
  Camera,
  Star,
  Image as ImageIcon,
  Upload,
  Zap,
  Droplets,
  FileWarning,
  PlayCircle,
  Trash2,
  GripVertical,
  BarChart2,
  PieChart as PieIcon,
  Maximize2,
  ArrowUpRight,
  ArrowDownRight,
  Lightbulb,
  Fuel,
  Activity,
  Edit,
  Moon,
  Sun,
  ExternalLink,
} from "lucide-react";

// --- 1. DATA GENERATION (GIỮ NGUYÊN) ---

const SPECS = {
  A: {
    height: "9m",
    floor: "3T/2.5T",
    power: "200 VA/m2",
    desc: "Nhà xưởng xây sẵn (RBF) tiêu chuẩn",
  },
  B: {
    height: "9m",
    floor: "3T/2.5T",
    power: "200 VA/m2",
    desc: "Nhà xưởng xây sẵn (RBF) tiêu chuẩn",
  },
  C: {
    height: "9m",
    floor: "3T/2.5T",
    power: "20 VA/m2",
    desc: "Kho vận Logistics (RBW)",
  },
};

// --- UTILITY DATA ---
const INITIAL_UTILITY_DATA = [
  {
    id: "E-A1-01",
    tenant: "CÔNG TY TNHH SKYWORTH",
    location: "Khu A - T1",
    type: "electricity",
    oldIndex: 1430164,
    newIndex: 1549932,
    lastMonthUsage: 118000,
    images: { old: null, new: null },
  },
  {
    id: "E-A1-02",
    tenant: "CÔNG TY TNHH PONHAN",
    location: "A3-3,4.F1 - A1-1.F1",
    type: "electricity",
    oldIndex: 840091,
    newIndex: 939978,
    lastMonthUsage: 95000,
    images: { old: null, new: null },
  },
  {
    id: "E-A1-03",
    tenant: "CÔNG TY TNHH NEWHENGSENG",
    location: "Khu A - T1",
    type: "electricity",
    oldIndex: 71900,
    newIndex: 83525,
    lastMonthUsage: 12000,
    images: { old: null, new: null },
  },
  {
    id: "E-A1-04",
    tenant: "CÔNG TY TNHH EACH",
    location: "Khu A - T1",
    type: "electricity",
    oldIndex: 156054,
    newIndex: 186409,
    lastMonthUsage: 29000,
    images: { old: null, new: null },
  },
  {
    id: "E-A1-05",
    tenant: "CÔNG TY TNHH MISAN",
    location: "Khu A - T1",
    type: "electricity",
    oldIndex: 70154,
    newIndex: 80143,
    lastMonthUsage: 9500,
    images: { old: null, new: null },
  },
  {
    id: "E-A1-06",
    tenant: "CÔNG TY TNHH JUYUAN",
    location: "Khu A - T1",
    type: "electricity",
    oldIndex: 2066984,
    newIndex: 2245140,
    lastMonthUsage: 180000,
    images: { old: null, new: null },
  },
  {
    id: "PUB-A1",
    tenant: "ĐIỆN CÔNG CỘNG (TRẠM T1)",
    location: "Trạm Biến Áp T1",
    type: "public_elec",
    oldIndex: 3227878,
    newIndex: 3695918,
    lastMonthUsage: 14000,
    images: { old: null, new: null },
    isSystem: true,
  },
  {
    id: "E-A2-01",
    tenant: "CÔNG TY TNHH CÔNG NGHỆ HKC",
    location: "Khu A - T2",
    type: "electricity",
    oldIndex: 4685525,
    newIndex: 5071995,
    lastMonthUsage: 390000,
    images: { old: null, new: null },
  },
  {
    id: "E-A2-02",
    tenant: "CÔNG TY TNHH K&K",
    location: "Khu A - T2",
    type: "electricity",
    oldIndex: 913534,
    newIndex: 946193,
    lastMonthUsage: 31000,
    images: { old: null, new: null },
  },
  {
    id: "E-A2-03",
    tenant: "CÔNG TY ĐIỆN TỬ VAST",
    location: "Khu A - T2",
    type: "electricity",
    oldIndex: 428346,
    newIndex: 443547,
    lastMonthUsage: 14500,
    images: { old: null, new: null },
  },
  {
    id: "E-A2-04",
    tenant: "CÔNG TY TNHH TIETEX VN",
    location: "Khu A - T2",
    type: "electricity",
    oldIndex: 14235,
    newIndex: 14784,
    lastMonthUsage: 500,
    images: { old: null, new: null },
  },
  {
    id: "E-A2-05",
    tenant: "CÔNG TY TNHH GBEST VIỆT NAM",
    location: "Khu A - T2",
    type: "electricity",
    oldIndex: 2417,
    newIndex: 3228,
    lastMonthUsage: 750,
    images: { old: null, new: null },
  },
  {
    id: "E-A2-06",
    tenant: "CÔNG TY TNHH REAK VIỆT NAM",
    location: "Khu A - T2",
    type: "electricity",
    oldIndex: 234469,
    newIndex: 272904,
    lastMonthUsage: 37000,
    images: { old: null, new: null },
  },
  {
    id: "E-A2-07",
    tenant: "CÔNG TY TNHH VOLTA",
    location: "Khu A - T2",
    type: "electricity",
    oldIndex: 59894,
    newIndex: 64749,
    lastMonthUsage: 4900,
    images: { old: null, new: null },
  },
  {
    id: "E-A2-08",
    tenant: "CÔNG TY TNHH HUATEX",
    location: "Khu A - T2",
    type: "electricity",
    oldIndex: 1402439,
    newIndex: 1508963,
    lastMonthUsage: 100000,
    images: { old: null, new: null },
  },
  {
    id: "E-BC-01",
    tenant: "CÔNG TY TNHH CIRCLE LOGISTIC",
    location: "Khu BC",
    type: "electricity",
    oldIndex: 14130,
    newIndex: 15275,
    lastMonthUsage: 1100,
    images: { old: null, new: null },
  },
  {
    id: "E-BC-02",
    tenant: "CÔNG TY NAMTEX",
    location: "Khu BC",
    type: "electricity",
    oldIndex: 16756,
    newIndex: 18021,
    lastMonthUsage: 1200,
    images: { old: null, new: null },
  },
  {
    id: "E-BC-03",
    tenant: "CÔNG TY TNHH SUNTONE",
    location: "Khu BC",
    type: "electricity",
    oldIndex: 51765,
    newIndex: 58216,
    lastMonthUsage: 6500,
    images: { old: null, new: null },
  },
  {
    id: "E-BC-04",
    tenant: "CÔNG TY TNHH CÔNG NGHỆ MTC VN",
    location: "Khu BC",
    type: "electricity",
    oldIndex: 11463793,
    newIndex: 12364007,
    lastMonthUsage: 880000,
    images: { old: null, new: null },
  },
  {
    id: "E-BC-05",
    tenant: "CÔNG TY TNHH CÔNG NGHỆ JIAWEI VN",
    location: "Khu BC",
    type: "electricity",
    oldIndex: 2350976,
    newIndex: 2635289,
    lastMonthUsage: 250000,
    images: { old: null, new: null },
  },
  {
    id: "E-BC-06",
    tenant: "CÔNG TY TNHH TAICHUNG TRAVEL",
    location: "C3-2.F1 - B3-2.F1",
    type: "electricity",
    oldIndex: 232777,
    newIndex: 250991,
    lastMonthUsage: 16000,
    images: { old: null, new: null },
  },
  // Đồng hồ tổng BC
  {
    id: "PUB-BC",
    tenant: "ĐIỆN CÔNG CỘNG KHU BC",
    location: "Trạm Tổng BC",
    type: "public_elec",
    oldIndex: 7732086,
    newIndex: 8923549,
    lastMonthUsage: 10000,
    images: { old: null, new: null },
    isSystem: true,
  },

  // --- KHU A (NƯỚC) ---
  {
    id: "W-A-01",
    tenant: "CÔNG TY TNHH CÔNG NGHỆ HKC",
    location: "Khu A",
    type: "water",
    oldIndex: 24843,
    newIndex: 28098,
    lastMonthUsage: 3100,
    images: { old: null, new: null },
  },
  {
    id: "W-A-02",
    tenant: "CÔNG TY TNHH K&K",
    location: "Khu A",
    type: "water",
    oldIndex: 3355,
    newIndex: 3449,
    lastMonthUsage: 90,
    images: { old: null, new: null },
  },
  {
    id: "W-A-03",
    tenant: "CÔNG TY ĐIỆN TỬ VAST",
    location: "Khu A",
    type: "water",
    oldIndex: 719,
    newIndex: 750,
    lastMonthUsage: 30,
    images: { old: null, new: null },
  },
  {
    id: "W-A-04",
    tenant: "CÔNG TY TNHH MISAN VINA",
    location: "Khu A",
    type: "water",
    oldIndex: 309,
    newIndex: 343,
    lastMonthUsage: 35,
    images: { old: null, new: null },
  },
  {
    id: "W-A-05",
    tenant: "CÔNG TY TNHH TIETEX VN",
    location: "Khu A",
    type: "water",
    oldIndex: 433,
    newIndex: 455,
    lastMonthUsage: 20,
    images: { old: null, new: null },
  },
  {
    id: "W-A-06",
    tenant: "CÔNG TY TNHH REAK VIỆT NAM",
    location: "Khu A",
    type: "water",
    oldIndex: 2817,
    newIndex: 3166,
    lastMonthUsage: 340,
    images: { old: null, new: null },
  },
  {
    id: "W-A-07",
    tenant: "CÔNG TY TNHH GBEST VIỆT NAM",
    location: "Khu A",
    type: "water",
    oldIndex: 227,
    newIndex: 241,
    lastMonthUsage: 15,
    images: { old: null, new: null },
  },
  {
    id: "W-A-08",
    tenant: "CÔNG TY TNHH HUATEX",
    location: "Khu A",
    type: "water",
    oldIndex: 4117,
    newIndex: 4471,
    lastMonthUsage: 360,
    images: { old: null, new: null },
  },
  {
    id: "W-A-09",
    tenant: "CÔNG TY TNHH VOLTA",
    location: "Khu A",
    type: "water",
    oldIndex: 837,
    newIndex: 855,
    lastMonthUsage: 18,
    images: { old: null, new: null },
  },

  // --- KHU BC (NƯỚC) ---
  {
    id: "W-BC-01",
    tenant: "CÔNG TY SUNTONE",
    location: "Khu BC",
    type: "water",
    oldIndex: 884,
    newIndex: 918,
    lastMonthUsage: 30,
    images: { old: null, new: null },
  },
  {
    id: "W-BC-02",
    tenant: "CÔNG TY TNHH NAMTEX",
    location: "Khu BC",
    type: "water",
    oldIndex: 40,
    newIndex: 41,
    lastMonthUsage: 1,
    images: { old: null, new: null },
  },
  {
    id: "W-BC-03",
    tenant: "CÔNG TY TNHH CIRCLE LOGISTIC",
    location: "Khu BC",
    type: "water",
    oldIndex: 94,
    newIndex: 101,
    lastMonthUsage: 5,
    images: { old: null, new: null },
  },
  {
    id: "W-BC-04",
    tenant: "CÔNG TY TNHH CÔNG NGHỆ MTC VN",
    location: "Khu BC",
    type: "water",
    oldIndex: 64392,
    newIndex: 72351,
    lastMonthUsage: 7900,
    images: { old: null, new: null },
  },
  {
    id: "W-BC-05",
    tenant: "CÔNG TY TNHH CÔNG NGHỆ JIAWEI VN",
    location: "Khu BC",
    type: "water",
    oldIndex: 7465,
    newIndex: 7939,
    lastMonthUsage: 480,
    images: { old: null, new: null },
  },
  {
    id: "W-BC-06",
    tenant: "CÔNG TY TNHH TAICHUNG TRAVEL",
    location: "Khu BC",
    type: "water",
    oldIndex: 3649,
    newIndex: 3791,
    lastMonthUsage: 140,
    images: { old: null, new: null },
  },
  // Đồng hồ tổng nước
  {
    id: "PUB-W-BC",
    tenant: "NƯỚC CÔNG CỘNG KHU BC",
    location: "Đồng hồ tổng",
    type: "public_water",
    oldIndex: 134975,
    newIndex: 147584,
    lastMonthUsage: 12000,
    images: { old: null, new: null },
    isSystem: true,
  },
];

// --- FUEL DATA (FROM UPLOADED FILES) ---
const INITIAL_FUEL_DATA = [
  {
    id: "F-A-01",
    name: "Bơm diesel PCCC khu A",
    location: "Trạm bơm khu A",
    capacity: 1500,
    current: 1120,
    lastRefuel: "2025-11-07",
    lastRefuelAmount: 30,
    type: "pump",
    logs: [
      {
        date: "2025-10-03",
        type: "run",
        startTime: "09:30",
        endTime: "10:00",
        duration: 30,
        consumption: 30,
        operator: "Hoàng",
        note: "Chạy định kỳ",
        images: [],
      },
      {
        date: "2025-10-10",
        type: "run",
        startTime: "09:25",
        endTime: "09:55",
        duration: 30,
        consumption: 30,
        operator: "Đô",
        note: "Chạy định kỳ",
        images: [],
      },
      {
        date: "2025-10-17",
        type: "run",
        startTime: "09:42",
        endTime: "10:12",
        duration: 30,
        consumption: 30,
        operator: "Khải",
        note: "Chạy định kỳ",
        images: [],
      },
      {
        date: "2025-10-24",
        type: "run",
        startTime: "09:40",
        endTime: "10:10",
        duration: 30,
        consumption: 30,
        operator: "Hải",
        note: "Chạy định kỳ",
        images: [],
      },
    ],
  },
  {
    id: "F-A-02",
    name: "Máy phát điện A1",
    location: "Trạm MSB#1",
    capacity: 600,
    current: 495,
    lastRefuel: "2025-11-07",
    lastRefuelAmount: 10,
    type: "generator",
    logs: [],
  },
  {
    id: "F-A-03",
    name: "Máy phát điện A2",
    location: "Trạm MSB#2",
    capacity: 600,
    current: 485,
    lastRefuel: "2025-11-07",
    lastRefuelAmount: 10,
    type: "generator",
    logs: [],
  },
  {
    id: "F-A-04",
    name: "Máy phát điện A3",
    location: "Trạm MSB#3",
    capacity: 500,
    current: 474,
    lastRefuel: "2025-11-07",
    lastRefuelAmount: 10,
    type: "generator",
    logs: [],
  },
  {
    id: "F-A-05",
    name: "Máy phát điện A4",
    location: "Trạm MSB#4",
    capacity: 500,
    current: 502,
    lastRefuel: "2025-11-07",
    lastRefuelAmount: 10,
    type: "generator",
    logs: [],
  },
  {
    id: "F-BC-01",
    name: "Bơm diesel PCCC khu BC",
    location: "Trạm bơm khu BC",
    capacity: 1500,
    current: 1060,
    lastRefuel: "2025-11-07",
    lastRefuelAmount: 30,
    type: "pump",
    logs: [
      {
        date: "2025-10-03",
        type: "run",
        startTime: "08:38",
        endTime: "08:53",
        duration: 15,
        consumption: 4,
        operator: "Hải",
        note: "Chạy định kỳ",
        images: [],
      },
      {
        date: "2025-10-10",
        type: "run",
        startTime: "08:45",
        endTime: "09:00",
        duration: 15,
        consumption: 4,
        operator: "Hải",
        note: "Chạy định kỳ",
        images: [],
      },
    ],
  },
  {
    id: "F-BC-02",
    name: "Máy phát điện C1-1",
    location: "Trạm MSB#7",
    capacity: 200,
    current: 177,
    lastRefuel: "2025-11-07",
    lastRefuelAmount: 10,
    type: "generator",
    logs: [],
  },
  {
    id: "F-BC-03",
    name: "Máy phát điện C3-1",
    location: "Trạm MSB#2",
    capacity: 255,
    current: 148,
    lastRefuel: "2025-11-07",
    lastRefuelAmount: 10,
    type: "generator",
    logs: [],
  },
  {
    id: "F-BC-04",
    name: "Máy phát điện C3-4",
    location: "Trạm MSB#1",
    capacity: 255,
    current: 223,
    lastRefuel: "2025-11-07",
    lastRefuelAmount: 10,
    type: "generator",
    logs: [],
  },
];

// --- SHARED DATA ---
const MAINTENANCE_CATEGORIES = [
  {
    id: "infra",
    label: "Hạ Tầng & Kiến Trúc",
    sub: [
      "Sàn bê tông / Epoxy",
      "Tường / Vách ngăn",
      "Cửa cuốn / Dock Leveler",
      "Mái / Chống thấm",
      "Trần / Cách nhiệt",
    ],
  },
  {
    id: "me",
    label: "Hệ Thống Cơ Điện (M&E)",
    sub: [
      "Hệ thống chiếu sáng",
      "Tủ điện / Máy biến áp",
      "Cấp thoát nước",
      "Quạt thông gió",
    ],
  },
  {
    id: "pccc",
    label: "An Toàn & PCCC",
    sub: [
      "Hệ thống báo cháy",
      "Đầu phun Sprinkler",
      "Bình chữa cháy",
      "Lối thoát hiểm",
    ],
  },
  {
    id: "landscape",
    label: "Cảnh Quan & Tiện Ích",
    sub: [
      "Đường nội bộ",
      "Cây xanh / Vệ sinh",
      "Hàng rào / Cổng",
      "Nhà bảo vệ",
    ],
  },
];

const SUPPORT_CATEGORIES = [
  "Điện (Electricity)",
  "Nước (Water)",
  "Internet / Viễn thông",
  "An ninh / Bảo vệ",
  "Vệ sinh / Cảnh quan",
  "Thủ tục / Giấy tờ",
  "Khác",
];

// Mock Data
const MAINTENANCE_TICKETS = [
  {
    id: "MT-001",
    date: "2024-10-15",
    unitId: "A4-1.F1",
    category: "Hạ Tầng & Kiến Trúc",
    subCategory: "Cửa cuốn / Dock Leveler",
    desc: "Cửa cuốn số 2 bị kẹt, motor kêu to.",
    status: "completed",
    priority: "high",
    reporter: "Nguyễn Văn A (BQL)",
  },
  {
    id: "MT-002",
    date: "2024-10-20",
    unitId: "C3-1.F1",
    category: "Hệ Thống Cơ Điện (M&E)",
    subCategory: "Hệ thống chiếu sáng",
    desc: "Dãy đèn LED khu vực kho lạnh bị nhấp nháy.",
    status: "processing",
    priority: "medium",
    reporter: "Trần Thị B (Tenant)",
  },
  {
    id: "MT-003",
    date: "2024-11-02",
    unitId: "B2-1.F2",
    category: "An Toàn & PCCC",
    subCategory: "Đầu phun Sprinkler",
    desc: "Rò rỉ nước nhẹ tại đầu phun khu vực hành lang.",
    status: "new",
    priority: "critical",
    reporter: "Lê Văn C (Bảo vệ)",
  },
  {
    id: "MT-004",
    date: "2024-11-05",
    unitId: "A2-3.F1",
    category: "Hạ Tầng & Kiến Trúc",
    subCategory: "Sàn bê tông / Epoxy",
    desc: "Sàn bị nứt chân chim khu vực xe nâng đi qua.",
    status: "new",
    priority: "low",
    reporter: "Phạm D (Kỹ thuật)",
  },
];

const SUPPORT_TICKETS = [
  {
    id: "REQ-001",
    title: "Mất điện cục bộ khu vực chuyền 2",
    type: "emergency",
    category: "Điện (Electricity)",
    status: "in_progress",
    progress: 65,
    eta: "14:30 Hôm nay",
    created: "2025-11-22 10:00",
    location: "A4-1.F1",
    description: "Aptomat tổng tự ngắt, có mùi khét nhẹ.",
    feedback: null,
    rating: 0,
    images: { before: null, during: null, after: null },
  },
  {
    id: "REQ-002",
    title: "Vòi nước nhà vệ sinh nam bị rò rỉ",
    type: "medium",
    category: "Nước (Water)",
    status: "pending",
    progress: 0,
    eta: "Chưa xác định",
    created: "2025-11-22 09:15",
    location: "C3-2.F1",
    description: "Nước chảy yếu nhưng không ngắt được.",
    feedback: null,
    rating: 0,
    images: { before: null, during: null, after: null },
  },
  {
    id: "REQ-003",
    title: "Thay bóng đèn cao áp đường nội bộ",
    type: "low",
    category: "Vệ sinh / Cảnh quan",
    status: "completed",
    progress: 100,
    eta: "Đã hoàn thành",
    created: "2025-11-20 14:00",
    location: "Đường D2",
    description: "Đèn số 15 bị nhấp nháy.",
    feedback: "Thợ làm nhanh, nhiệt tình.",
    rating: 5,
    images: { before: null, during: null, after: null },
  },
];

const NOTICES = [
  {
    id: 1,
    type: "maintenance",
    title: "Bảo trì trạm biến áp T2",
    date: "25/11/2025",
    time: "08:00 - 12:00",
    desc: "Cắt điện toàn bộ khu B để bảo dưỡng định kỳ.",
  },
  {
    id: 2,
    type: "payment",
    title: "Nhắc hạn thanh toán phí QL",
    date: "30/11/2025",
    time: "Hạn chót",
    desc: "Vui lòng thanh toán phí quản lý tháng 11.",
  },
  {
    id: 3,
    type: "legal",
    title: "Gia hạn giấy phép PCCC",
    date: "15/12/2025",
    time: "Sắp hết hạn",
    desc: "Giấy chứng nhận PCCC của Unit A4-1 sắp hết hạn.",
  },
];

// Helper tạo unit
const createUnit = (code, type, floor, area) => {
  const zone = type.charAt(type.length - 1); // A, B, or C
  return {
    id: `${code}.${floor}`,
    name: `${type} ${code}`,
    floor: floor,
    zone: zone,
    type: type.includes("Warehouse") ? "Warehouse" : "Factory",
    area: area,
    price: type.includes("Warehouse") ? 4.2 : 4.8,
    status: "vacant",
    tenant: "",
    expiry: null,
    issue: null,
    tech: {
      height: SPECS[zone]?.height || "9m",
      floor: "3.0 tấn/m2",
      power: SPECS[zone]?.power,
      pccc: "Đã nghiệm thu",
    },
  };
};

// Dữ liệu thô từ Master Plan ĐẦY ĐỦ
// --- DỮ LIỆU ĐÃ SẮP XẾP CHUẨN (A1 -> A4, B1 -> B3, C1 -> C3) ---
const rawUnits = [
  // --- KHU A (FACTORY) ---
  // Dãy A1
  createUnit("A1-1", "Factory A", "F1", 3167),
  createUnit("A1-1", "Factory A", "F2", 3372),
  createUnit("A1-2", "Factory A", "F1", 2422),
  createUnit("A1-2", "Factory A", "F2", 2699),
  createUnit("A1-3", "Factory A", "F1", 2357),
  createUnit("A1-3", "Factory A", "F2", 2634),
  createUnit("A1-4", "Factory A", "F1", 3178),
  createUnit("A1-4", "Factory A", "F2", 3383),
  createUnit("A1-5", "Factory A", "F1", 3192),
  createUnit("A1-5", "Factory A", "F2", 3412),

  // Dãy A2
  createUnit("A2-1", "Factory A", "F1", 3167),
  createUnit("A2-1", "Factory A", "F2", 3372),
  createUnit("A2-2", "Factory A", "F1", 2422),
  createUnit("A2-2", "Factory A", "F2", 2699),
  createUnit("A2-3", "Factory A", "F1", 2357),
  createUnit("A2-3", "Factory A", "F2", 2634),
  createUnit("A2-4", "Factory A", "F1", 3178),
  createUnit("A2-4", "Factory A", "F2", 3383),
  createUnit("A2-5", "Factory A", "F1", 3192),
  createUnit("A2-5", "Factory A", "F2", 3412),

  // Dãy A3
  createUnit("A3-1", "Factory A", "F1", 2375),
  createUnit("A3-1", "Factory A", "F2", 2652),
  createUnit("A3-2", "Factory A", "F1", 2386),
  createUnit("A3-2", "Factory A", "F2", 2663),
  createUnit("A3-3", "Factory A", "F1", 2393),
  createUnit("A3-3", "Factory A", "F2", 2670),
  createUnit("A3-4", "Factory A", "F1", 2404),
  createUnit("A3-4", "Factory A", "F2", 2681),

  // Dãy A4
  createUnit("A4-1", "Factory A", "F1", 2375),
  createUnit("A4-1", "Factory A", "F2", 2652),
  createUnit("A4-2", "Factory A", "F1", 2386),
  createUnit("A4-2", "Factory A", "F2", 2663),
  createUnit("A4-3", "Factory A", "F1", 2393),
  createUnit("A4-3", "Factory A", "F2", 2670),
  createUnit("A4-4", "Factory A", "F1", 2404),
  createUnit("A4-4", "Factory A", "F2", 2681),

  // --- KHU B (FACTORY) ---
  // Dãy B1
  createUnit("B1-1", "Factory B", "F1", 3167),
  createUnit("B1-1", "Factory B", "F2", 3372),
  createUnit("B1-2", "Factory B", "F1", 3178),
  createUnit("B1-2", "Factory B", "F2", 3383),
  createUnit("B1-3", "Factory B", "F1", 3192),
  createUnit("B1-3", "Factory B", "F2", 3412),

  // Dãy B2
  createUnit("B2-1", "Factory B", "F1", 3167),
  createUnit("B2-1", "Factory B", "F2", 3372),
  createUnit("B2-2", "Factory B", "F1", 3178),
  createUnit("B2-2", "Factory B", "F2", 3383),
  createUnit("B2-3", "Factory B", "F1", 3192),
  createUnit("B2-3", "Factory B", "F2", 3412),

  // Dãy B3
  createUnit("B3-1", "Factory B", "F1", 3167),
  createUnit("B3-1", "Factory B", "F2", 3372),
  createUnit("B3-2", "Factory B", "F1", 3178),
  createUnit("B3-2", "Factory B", "F2", 3383),
  createUnit("B3-3", "Factory B", "F1", 3192),
  createUnit("B3-3", "Factory B", "F2", 3412),

  // --- KHU C (WAREHOUSE) ---
  // Dãy C1
  createUnit("C1-1", "Warehouse C", "F1", 3989),
  createUnit("C1-1", "Warehouse C", "F2", 4141),
  createUnit("C1-2", "Warehouse C", "F1", 3244),
  createUnit("C1-2", "Warehouse C", "F2", 3468),
  createUnit("C1-3", "Warehouse C", "F1", 3179),
  createUnit("C1-3", "Warehouse C", "F2", 3403),
  createUnit("C1-4", "Warehouse C", "F1", 4018),
  createUnit("C1-4", "Warehouse C", "F2", 4170),

  // Dãy C2
  createUnit("C2-1", "Warehouse C", "F1", 3989),
  createUnit("C2-1", "Warehouse C", "F2", 4141),
  createUnit("C2-2", "Warehouse C", "F1", 3244),
  createUnit("C2-2", "Warehouse C", "F2", 3468),
  createUnit("C2-3", "Warehouse C", "F1", 3179),
  createUnit("C2-3", "Warehouse C", "F2", 3403),
  createUnit("C2-4", "Warehouse C", "F1", 4018),
  createUnit("C2-4", "Warehouse C", "F2", 4170),

  // Dãy C3
  createUnit("C3-1", "Warehouse C", "F1", 3989),
  createUnit("C3-1", "Warehouse C", "F2", 4141),
  createUnit("C3-2", "Warehouse C", "F1", 3244),
  createUnit("C3-2", "Warehouse C", "F2", 3468),
  createUnit("C3-3", "Warehouse C", "F1", 3179),
  createUnit("C3-3", "Warehouse C", "F2", 3403),
  createUnit("C3-4", "Warehouse C", "F1", 4018),
  createUnit("C3-4", "Warehouse C", "F2", 4170),
];

// --- DANH SÁCH NGÀNH HÀNG GIẢ LẬP ---
const INDUSTRIES = [
  "Logistics",
  "Linh Kiện Điện tử",
  "Dệt may",
  "Sản Xuất Nhựa ",
  "Đồ thể Thao",
  "Cơ khí",
];

const seedData = () =>
  rawUnits.map((unit) => {
    const rand = Math.random();
    // 5% là ô trống, còn lại có khách hoặc bảo trì
    if (rand > 0.05) {
      const isMaintenance = rand > 0.95;
      const tenantName = "Samsung Logistics"; // Tên ví dụ
      const today = new Date();
      today.setMonth(today.getMonth() + 12);

      // --- THÊM LOGIC CHỌN NGÀNH HÀNG ---
      // Lấy ngẫu nhiên 1 ngành từ danh sách
      const randomIndustry =
        INDUSTRIES[Math.floor(Math.random() * INDUSTRIES.length)];

      return {
        ...unit,
        status: isMaintenance ? "maintenance" : "occupied",
        tenant: isMaintenance ? "" : tenantName,
        // Nếu đang thuê thì có ngành hàng, bảo trì thì không
        industry: isMaintenance ? null : randomIndustry,
        expiry: isMaintenance ? null : today.toISOString().split("T")[0],
        issue: isMaintenance ? "Bảo trì PCCC" : null,
      };
    }
    return { ...unit, industry: null }; // Ô trống không có ngành hàng
  });
const initialData = seedData();
const COLORS = {
  occupied: "#10b981",
  vacant: "#e2e8f0",
  maintenance: "#f59e0b",
  pie: ["#3b82f6", "#10b981", "#f59e0b", "#64748b"],
};

// --- STAT CARD: GRADIENT 3 TẦNG (ĐỒNG BỘ VỚI SIDEBAR) ---
const StatCard = ({ title, value, subtext, icon: Icon, trend }) => (
  <div
    className="relative overflow-hidden p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
    /* Áp dụng Gradient 3 màu giống Sidebar: #015C92 -> #2D82B5 -> #53A6D8 */
    bg-gradient-to-br from-[#015C92] via-[#2D82B5] to-[#53A6D8]
    border border-white/10 shadow-lg"
  >
    {/* Trang trí: Vòng tròn màu tím nhạt mờ ở góc */}
    <div className="absolute top-0 right-0 w-24 h-24 bg-[#DD83E0]/10 rounded-full blur-2xl -mr-5 -mt-5 pointer-events-none"></div>

    <div className="flex justify-between items-start mb-4 relative z-10">
      {/* --- ĐÂY LÀ PHẦN BẠN MUỐN SỬA --- */}
      {/* Hộp Icon: Gradient từ Xanh Than (#112D60) sang Tím Hồng (#DD83E0) */}
      <div className="p-3 rounded-xl shadow-lg text-white bg-gradient-to-br from-[#112D60] to-[#DD83E0]">
        <Icon size={22} />
      </div>

      {/* CHỈ SỐ %: Giữ nguyên Xanh (Tăng) / Đỏ (Giảm) theo yêu cầu */}
      {trend && (
        <span
          className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm border ${
            trend > 0
              ? "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-transparent"
              : "bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-900/30 dark:text-rose-400 dark:border-transparent"
          }`}
        >
          {trend > 0 ? (
            <ArrowUpRight size={12} />
          ) : (
            <ArrowDownRight size={12} />
          )}
          {Math.abs(trend)}%
        </span>
      )}
    </div>

    {/* Phần số liệu: Chữ màu TRẮNG (White) để tương phản */}
    <div className="relative z-10">
      <h3 className="text-3xl font-bold text-white mb-1 tracking-tight drop-shadow-md">
        {value}
      </h3>
      <p className="text-sm font-medium text-white/90">{title}</p>

      <div className="mt-4 pt-3 border-t border-white/20 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_5px_white]"></div>
        <p className="text-xs text-white/80 truncate">{subtext}</p>
      </div>
    </div>
  </div>
);
// --- ZONE MAP: PHIÊN BẢN TRÀN VIỀN CÂN ĐỐI (RESPONSIVE) ---
const ZoneMap = ({ units, zoneName, onSelect, isReadOnly }) => {
  const zoneUnits = units.filter((u) => u.zone === zoneName);
  return (
    <div className="mb-6">
      <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
        <Map size={14} /> Khu Vực {zoneName}
      </h4>
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
        {zoneUnits.map((u) => (
          <div
            key={u.id}
            onClick={() => onSelect(u)}
            className={`relative group cursor-pointer p-2 rounded border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
              u.status === "occupied"
                ? "bg-emerald-50 border-emerald-200"
                : u.status === "vacant"
                ? "bg-white border-slate-200 border-dashed"
                : "bg-amber-50 border-amber-200"
            }`}
          >
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-slate-500">
                {u.floor}
              </span>
              {u.status === "occupied" && (
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              )}
              {u.status === "maintenance" && (
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
              )}
            </div>
            <div className="mt-1">
              <div className="text-xs font-bold text-slate-700">
                {u.id.split(".")[0]}
              </div>
              <div className="text-[9px] text-slate-400">{u.area} m²</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ImageUploader = ({
  label,
  hasImage,
  onUpload,
  onDelete,
  isLoggedIn,
  onView,
}) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      // SỬA ĐỔI: Truyền trực tiếp file gốc cho hàm xử lý bên ngoài
      onUpload(e.target.files[0]);
    }
  };

  const handleClick = (e) => {
    if (hasImage) {
      e.stopPropagation();
      onView(hasImage);
    } else if (isLoggedIn) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <span
        className={`text-xs font-bold center uppercase ${
          hasImage ? "text-emerald-600" : "text-slate-500"
        }`}
      >
        {label}
      </span>
      <div
        className={`aspect-square rounded-lg border-2 border-dashed flex flex-col items-center justify-center relative overflow-hidden group transition-all
          ${
            hasImage
              ? "bg-slate-100 border-emerald-300 cursor-zoom-in"
              : "bg-slate-50 border-slate-300 hover:border-blue-400 hover:bg-blue-50 cursor-pointer"
          }`}
        onClick={handleClick}
      >
        {hasImage ? (
          <div className="w-full h-full relative group">
            <img
              src={hasImage}
              alt="Evidence"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onView(hasImage);
                }}
                className="p-2 bg-white/20 backdrop-blur rounded-full text-white hover:bg-white/40 transition-colors"
                title="Xem ảnh"
              >
                <Maximize2 size={16} />
              </button>
              {isLoggedIn && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                  }}
                  className="p-2 bg-red-500/80 backdrop-blur rounded-full text-white hover:bg-red-600 transition-colors"
                  title="Xóa ảnh"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
            <div className="absolute bottom-2 left-2 bg-emerald-500/90 text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
              <CheckSquare size={10} /> Đã tải lên
            </div>
          </div>
        ) : (
          <div className="text-center p-2">
            <Upload
              size={24}
              className={`mx-auto mb-2 ${
                isLoggedIn ? "text-blue-500" : "text-slate-300"
              }`}
            />
            <span
              className={`text-[10px] font-bold ${
                isLoggedIn ? "text-blue-600" : "text-slate-400"
              }`}
            >
              {isLoggedIn ? "Tải ảnh lên" : "Chưa cập nhật"}
            </span>
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
          disabled={!isLoggedIn}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
};

const UtilityImageCell = ({ src, isLoggedIn, onUpload, onDelete, onView }) => {
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Giới hạn 500KB để tránh làm nặng LocalStorage
      if (file.size > 500 * 1024) {
        alert("File ảnh quá lớn! Vui lòng chọn ảnh dưới 500KB.");
        return;
      }

      // Chuyển ảnh sang Base64
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpload(reader.result); // Trả về chuỗi Base64
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex justify-center relative group">
      <div
        className={`w-12 h-12 rounded border flex items-center justify-center overflow-hidden transition-all ${
          src
            ? "border-emerald-500 bg-white cursor-zoom-in"
            : "border-dashed border-slate-300 bg-slate-50 hover:bg-blue-50 cursor-pointer"
        }`}
        onClick={() =>
          src ? onView(src) : isLoggedIn && inputRef.current?.click()
        }
        title={src ? "Bấm để xem ảnh" : "Tải ảnh lên"}
      >
        {src ? (
          <img src={src} className="w-full h-full object-cover" alt="Utility" />
        ) : (
          <Camera size={16} className="text-slate-400" />
        )}
      </div>

      {/* Nút xóa ảnh (chỉ hiện khi có ảnh + đã đăng nhập) */}
      {src && isLoggedIn && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (window.confirm("Xóa ảnh này?")) onDelete();
          }}
          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-10"
          title="Xóa ảnh"
        >
          <X size={10} />
        </button>
      )}

      <input
        type="file"
        ref={inputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
};

// --- MODULE 4: FUEL MANAGEMENT (FINAL FIX) ---
// // --- MODULE 4: FUEL MANAGEMENT (FINAL FIXED) ---
const FuelManagementPanel = ({ isLoggedIn }) => {
  // 1. AUTO-SAVE & INIT
  const [fuelData, setFuelData] = useState(() => {
    const saved = localStorage.getItem("bw_fuel_data");
    return saved ? JSON.parse(saved) : INITIAL_FUEL_DATA;
  });

  // 2. STATES
  const [viewMonth, setViewMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [showLogModal, setShowLogModal] = useState(false);
  const [showRefuelModal, setShowRefuelModal] = useState(false);
  const [editingLogIndex, setEditingLogIndex] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  // State form nhập liệu
  const [newLog, setNewLog] = useState({
    date: "",
    startTime: "",
    endTime: "",
    duration: 0,
    consumption: 0,
    operator: "",
    note: "",
    images: [],
  });
  const [newRefuel, setNewRefuel] = useState({
    date: "",
    currentLevel: 0,
    amount: 0,
    note: "",
    imageBefore: null,
    imageAfter: null,
  });

  // Tự động lưu khi data thay đổi
  useEffect(() => {
    localStorage.setItem("bw_fuel_data", JSON.stringify(fuelData));
  }, [fuelData]);

  // Sync selected machine khi data thay đổi
  useEffect(() => {
    if (selectedMachine) {
      const updated = fuelData.find((m) => m.id === selectedMachine.id);
      if (updated) setSelectedMachine(updated);
    }
  }, [fuelData]);

  // 3. LOGIC THỐNG KÊ (ĐỒNG BỘ VỚI THÁNG ĐANG CHỌN)
  const stats = useMemo(() => {
    let totalConsumed = 0;
    let machinesChecked = new Set();

    fuelData.forEach((machine) => {
      const logsInMonth = machine.logs.filter((log) =>
        log.date.startsWith(viewMonth)
      );
      logsInMonth.forEach((log) => {
        if (log.type === "run") {
          totalConsumed += parseInt(log.consumption) || 0;
          machinesChecked.add(machine.id);
        }
      });
    });

    return {
      totalConsumed,
      checkedCount: machinesChecked.size,
    };
  }, [fuelData, viewMonth]);

  // --- HÀM XỬ LÝ ẢNH BASE64 ---
  const handleFileRead = (file, callback) => {
    if (!file) return;
    if (file.size > 500 * 1024)
      return alert("Ảnh quá lớn! Vui lòng chọn < 500KB");
    const reader = new FileReader();
    reader.onloadend = () => callback(reader.result);
    reader.readAsDataURL(file);
  };

  // Auto calc duration
  useEffect(() => {
    if (newLog.startTime && newLog.endTime) {
      const [startH, startM] = newLog.startTime.split(":").map(Number);
      const [endH, endM] = newLog.endTime.split(":").map(Number);
      const duration = endH * 60 + endM - (startH * 60 + startM);
      if (duration > 0) setNewLog((prev) => ({ ...prev, duration }));
    }
  }, [newLog.startTime, newLog.endTime]);

  // --- SAVE LOG (CHẠY MÁY) ---
// Nhớ thêm từ khóa async
const handleSaveLog = async () => {
  if (!selectedMachine || !newLog.date || !newLog.duration)
    return alert("Thiếu thông tin!");

  // --- Giữ nguyên logic tính toán cũ ---
  let updatedLogs = [...selectedMachine.logs];
  let fuelAdjustment = 0;

  if (editingLogIndex !== null) {
    const oldLog = updatedLogs[editingLogIndex];
    if (oldLog.type === "run")
      fuelAdjustment = (parseInt(oldLog.consumption) || 0) - (parseInt(newLog.consumption) || 0);
    updatedLogs[editingLogIndex] = { ...newLog, type: "run" };
  } else {
    updatedLogs.push({ ...newLog, type: "run" });
    fuelAdjustment = -(parseInt(newLog.consumption) || 0);
  }

  const updatedMachine = {
    ...selectedMachine,
    current: selectedMachine.current + fuelAdjustment,
    logs: updatedLogs,
  };
  // -------------------------------------

  // 1. Cập nhật UI
  setFuelData((prev) =>
    prev.map((m) => (m.id === selectedMachine.id ? updatedMachine : m))
  );

  // 2. Gửi lên Supabase - THÊM ĐOẠN NÀY
  // Ta cập nhật lại mức dầu hiện tại (current_level) và toàn bộ mảng lịch sử (logs)
  const { error } = await supabase
    .from('fuel_logs')
    .update({
      current_level: updatedMachine.current,
      logs: updatedMachine.logs // Supabase tự lưu mảng này vào cột jsonb
    })
    .eq('id', selectedMachine.id);

  if (error) alert("Lỗi lưu: " + error.message);

  setShowLogModal(false);
  // Reset form
  setNewLog({ date: "", startTime: "", endTime: "", duration: 0, consumption: 0, operator: "", note: "", images: [] });
  setEditingLogIndex(null);
};

  // --- SAVE REFUEL (CHÂM DẦU) ---
  const handleAddRefuel = () => {
    if (!selectedMachine || !newRefuel.date || !newRefuel.amount)
      return alert("Thiếu thông tin!");

    const updatedMachine = {
      ...selectedMachine,
      current:
        (parseInt(newRefuel.currentLevel) || selectedMachine.current) +
        parseInt(newRefuel.amount),
      lastRefuel: newRefuel.date,
      lastRefuelAmount: parseInt(newRefuel.amount),
      logs: [
        ...selectedMachine.logs,
        {
          type: "refuel",
          date: newRefuel.date,
          amount: newRefuel.amount,
          totalAfter:
            (parseInt(newRefuel.currentLevel) || selectedMachine.current) +
            parseInt(newRefuel.amount),
          note: newRefuel.note,
          images: {
            before: newRefuel.imageBefore,
            after: newRefuel.imageAfter,
          },
        },
      ],
    };
    setFuelData((prev) =>
      prev.map((m) => (m.id === selectedMachine.id ? updatedMachine : m))
    );
    setShowRefuelModal(false);
    setNewRefuel({
      date: "",
      currentLevel: 0,
      amount: 0,
      note: "",
      imageBefore: null,
      imageAfter: null,
    });
  };

  const handleDeleteLog = (index) => {
    if (!window.confirm("Xóa nhật ký này?")) return;
    const logToDelete = selectedMachine.logs[index];
    let fuelAdjustment = 0;
    if (logToDelete.type === "run")
      fuelAdjustment = parseInt(logToDelete.consumption) || 0;
    else if (logToDelete.type === "refuel")
      fuelAdjustment = -(parseInt(logToDelete.amount) || 0);

    const updatedLogs = selectedMachine.logs.filter((_, i) => i !== index);
    const updatedMachine = {
      ...selectedMachine,
      current: selectedMachine.current + fuelAdjustment,
      logs: updatedLogs,
    };
    setFuelData((prev) =>
      prev.map((m) => (m.id === selectedMachine.id ? updatedMachine : m))
    );
  };

  const filteredLogs = selectedMachine
    ? selectedMachine.logs.filter((log) => log.date.startsWith(viewMonth))
    : [];
  const filteredMachines = fuelData.filter(
    (m) => activeTab === "all" || m.type === activeTab
  );

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* HEADER & FILTER */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Fuel size={24} className="text-orange-500" /> Quản Lý Nhiên Liệu
        </h2>

        {/* BỘ LỌC THÁNG CHUNG */}
        <div className="flex items-center gap-3 bg-white p-2 rounded-xl shadow-sm border">
          <span className="text-xs font-bold text-slate-500 uppercase">
            Tháng kiểm tra:
          </span>
          <input
            type="month"
            className="font-bold text-slate-800 outline-none bg-transparent cursor-pointer"
            value={viewMonth}
            onChange={(e) => setViewMonth(e.target.value)}
          />
        </div>

        <div className="flex bg-slate-100 p-1 rounded-lg">
          {["all", "pump", "generator"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-md text-xs font-bold capitalize transition-all ${
                activeTab === tab
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab === "all"
                ? "Tất cả"
                : tab === "pump"
                ? "Bơm PCCC"
                : "Máy Phát"}
            </button>
          ))}
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border shadow-sm flex items-center gap-4">
          <div className="p-3 bg-orange-100 text-orange-600 rounded-full">
            <Droplets size={20} />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-800">
              {stats.totalConsumed.toLocaleString()} L
            </div>
            <div className="text-xs text-slate-500">
              Tổng dầu đã chạy (Tháng {viewMonth.split("-")[1]})
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border shadow-sm flex items-center gap-4 col-span-2">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
            <Activity size={20} />
          </div>
          <div>
            <div className="text-lg font-bold text-slate-800">
              {stats.checkedCount} / {fuelData.length} Máy
            </div>
            <div className="text-xs text-slate-500">
              Đã chạy kiểm tra trong tháng {viewMonth}
            </div>
          </div>
        </div>
      </div>

      {/* MACHINES GRID */}
      <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 content-start p-1">
        {filteredMachines.map((m) => (
          <div
            key={m.id}
            className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
            onClick={() => setSelectedMachine(m)}
          >
            <div className="flex justify-between items-start mb-3">
              <div
                className={`p-2 rounded-lg ${
                  m.type === "pump"
                    ? "bg-red-100 text-red-600"
                    : "bg-blue-100 text-blue-600"
                }`}
              >
                {m.type === "pump" ? <Droplets size={20} /> : <Zap size={20} />}
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-full block mb-1">
                  {m.location}
                </span>
              </div>
            </div>
            <h4 className="font-bold text-slate-800 text-sm mb-1 line-clamp-1">
              {m.name}
            </h4>
            <div className="text-xs text-slate-500 mb-4">
              Dung tích: {m.capacity}L
            </div>
            <div className="flex justify-between items-end border-t pt-3 border-slate-100">
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-bold">
                  Hiện tại
                </div>
                <div
                  className={`text-lg font-bold ${
                    m.current < m.capacity * 0.2
                      ? "text-red-500"
                      : "text-emerald-600"
                  }`}
                >
                  {m.current} <span className="text-xs text-slate-400">L</span>
                </div>
              </div>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full mt-3 overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  m.current < m.capacity * 0.2 ? "bg-red-500" : "bg-emerald-500"
                }`}
                style={{ width: `${(m.current / m.capacity) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* DETAIL OVERLAY */}
      {selectedMachine && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex justify-end animate-in slide-in-from-right duration-300">
          <div className="w-full max-w-4xl bg-white h-full shadow-2xl flex flex-col">
            <div className="p-6 border-b bg-slate-50 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-xl text-slate-800 flex items-center gap-2">
                  {selectedMachine.name}
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  {selectedMachine.location} • {selectedMachine.capacity}L
                </p>
              </div>
              <button
                onClick={() => setSelectedMachine(null)}
                className="p-2 hover:bg-slate-200 rounded-full text-slate-500"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 p-6 overflow-y-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold text-slate-700 flex items-center gap-2">
                      <Calendar size={16} /> Lịch Sử Hoạt Động{" "}
                      <span className="text-blue-600">({viewMonth})</span>
                    </h4>
                    {isLoggedIn && (
                      <button
                        onClick={() => {
                          setNewLog({
                            date: "",
                            startTime: "",
                            endTime: "",
                            duration: 0,
                            consumption: 0,
                            operator: "",
                            note: "",
                            images: [],
                          });
                          setEditingLogIndex(null);
                          setShowLogModal(true);
                        }}
                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700"
                      >
                        <Plus size={14} /> Thêm chạy máy
                      </button>
                    )}
                  </div>

                  <table className="w-full text-sm text-left border rounded-lg overflow-hidden">
                    <thead className="bg-slate-100 text-slate-600 font-bold">
                      <tr>
                        <th className="px-4 py-3">Ngày</th>
                        <th className="px-4 py-3">Chi tiết</th>
                        <th className="px-4 py-3 text-right">Tiêu hao/Tồn</th>
                        <th className="px-4 py-3">Ghi chú/Ảnh</th>
                        {isLoggedIn && (
                          <th className="px-4 py-3 text-right">Thao tác</th>
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredLogs.length > 0 ? (
                        filteredLogs.map((log, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="px-4 py-3 font-medium text-slate-800">
                              {log.date}
                            </td>
                            <td className="px-4 py-3 text-slate-600">
                              {log.type === "run" ? (
                                <div>
                                  <div className="font-bold">
                                    {log.duration} phút
                                  </div>
                                  <div className="text-[10px]">
                                    {log.startTime} - {log.endTime}
                                  </div>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2 text-emerald-600 font-bold">
                                  <Plus size={12} /> Châm dầu
                                </div>
                              )}
                            </td>
                            <td className="px-4 py-3 text-right font-mono font-bold">
                              {log.type === "run" ? (
                                <span className="text-red-500">
                                  -{log.consumption} L
                                </span>
                              ) : (
                                <span className="text-emerald-600">
                                  {log.totalAfter} L
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-slate-500 text-xs">
                              <div>{log.note || "-"}</div>
                              <div className="flex gap-1 mt-1">
                                {log.type === "run" &&
                                  log.images &&
                                  log.images.map((img, i) => (
                                    <img
                                      key={i}
                                      src={img}
                                      className="w-8 h-8 rounded border cursor-pointer object-cover"
                                      onClick={() => setPreviewImage(img)}
                                    />
                                  ))}
                                {log.type === "refuel" && (
                                  <>
                                    {log.images?.before && (
                                      <img
                                        src={log.images.before}
                                        className="w-8 h-8 rounded border cursor-pointer object-cover"
                                        onClick={() =>
                                          setPreviewImage(log.images.before)
                                        }
                                        title="Trước"
                                      />
                                    )}
                                    {log.images?.after && (
                                      <img
                                        src={log.images.after}
                                        className="w-8 h-8 rounded border cursor-pointer object-cover"
                                        onClick={() =>
                                          setPreviewImage(log.images.after)
                                        }
                                        title="Sau"
                                      />
                                    )}
                                  </>
                                )}
                              </div>
                            </td>
                            {isLoggedIn && (
                              <td className="px-4 py-3 text-right">
                                <div className="flex justify-end gap-2">
                                  <button onClick={() => handleDeleteLog(idx)}>
                                    <Trash2
                                      size={14}
                                      className="text-red-500"
                                    />
                                  </button>
                                </div>
                              </td>
                            )}
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="5"
                            className="p-8 text-center text-slate-400 italic"
                          >
                            Không có dữ liệu tháng {viewMonth}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 text-center">
                  <div className="text-sm font-bold text-blue-600 uppercase mb-2">
                    Dầu hiện tại
                  </div>
                  <div className="text-4xl font-bold text-slate-800">
                    {selectedMachine.current}{" "}
                    <span className="text-lg text-slate-500">Lít</span>
                  </div>
                </div>
                <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
                  <div className="text-sm font-bold text-orange-600 uppercase mb-2">
                    Lần châm gần nhất
                  </div>
                  <div className="text-xl font-bold text-slate-800">
                    {selectedMachine.lastRefuel || "Chưa có"}
                  </div>
                  <div className="text-sm text-slate-500">
                    +{selectedMachine.lastRefuelAmount || 0} Lít
                  </div>
                </div>
                {isLoggedIn && (
                  <button
                    onClick={() => setShowRefuelModal(true)}
                    className="w-full py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 shadow-lg flex items-center justify-center gap-2"
                  >
                    <Droplets /> Báo cáo châm dầu
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LOG MODAL */}
      {showLogModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            <h3 className="font-bold text-lg mb-4 text-slate-800 border-b pb-2">
              Báo Cáo Chạy Máy
            </h3>
            <div className="space-y-4">
              <input
                type="date"
                className="w-full p-2 border rounded"
                value={newLog.date}
                onChange={(e) => setNewLog({ ...newLog, date: e.target.value })}
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="time"
                  className="p-2 border rounded"
                  value={newLog.startTime}
                  onChange={(e) =>
                    setNewLog({ ...newLog, startTime: e.target.value })
                  }
                />
                <input
                  type="time"
                  className="p-2 border rounded"
                  value={newLog.endTime}
                  onChange={(e) =>
                    setNewLog({ ...newLog, endTime: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  className="p-2 border rounded"
                  placeholder="Phút"
                  value={newLog.duration}
                  onChange={(e) =>
                    setNewLog({ ...newLog, duration: e.target.value })
                  }
                />
                <input
                  type="number"
                  className="p-2 border rounded"
                  placeholder="Tiêu hao (L)"
                  value={newLog.consumption}
                  onChange={(e) =>
                    setNewLog({ ...newLog, consumption: e.target.value })
                  }
                />
              </div>
              <input
                className="w-full p-2 border rounded"
                placeholder="Người vận hành"
                value={newLog.operator}
                onChange={(e) =>
                  setNewLog({ ...newLog, operator: e.target.value })
                }
              />

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-2">
                  Hình ảnh minh chứng
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {newLog.images.map((img, i) => (
                    <div key={i} className="relative aspect-square">
                      <img
                        src={img}
                        className="w-full h-full object-cover rounded"
                      />
                      <button
                        onClick={() =>
                          setNewLog((prev) => ({
                            ...prev,
                            images: prev.images.filter((_, idx) => idx !== i),
                          }))
                        }
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5"
                      >
                        <X size={10} />
                      </button>
                    </div>
                  ))}
                  <label className="aspect-square border-2 border-dashed rounded flex items-center justify-center cursor-pointer hover:bg-slate-50">
                    <Plus size={20} />
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files) {
                          Array.from(e.target.files).forEach((file) => {
                            handleFileRead(file, (base64) => {
                              setNewLog((prev) => ({
                                ...prev,
                                images: [...prev.images, base64],
                              }));
                            });
                          });
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  onClick={() => setShowLogModal(false)}
                  className="px-4 py-2 text-slate-600 bg-slate-100 rounded font-bold"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSaveLog}
                  className="px-4 py-2 bg-blue-600 text-white rounded font-bold"
                >
                  Lưu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* REFUEL MODAL */}
      {showRefuelModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-2xl">
            <h3 className="font-bold text-lg mb-4 text-slate-800 border-b pb-2">
              Báo Cáo Châm Dầu
            </h3>
            <div className="space-y-4">
              <input
                type="date"
                className="w-full p-2 border rounded"
                onChange={(e) =>
                  setNewRefuel({ ...newRefuel, date: e.target.value })
                }
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs">Tồn đầu</label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded"
                    value={selectedMachine?.current}
                    readOnly
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-emerald-600">
                    Châm thêm (L)
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded font-bold text-emerald-600"
                    onChange={(e) =>
                      setNewRefuel({ ...newRefuel, amount: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs block mb-1">Ảnh Trước</label>
                  <label className="block aspect-video border-2 border-dashed rounded flex items-center justify-center cursor-pointer overflow-hidden bg-slate-50">
                    {newRefuel.imageBefore ? (
                      <img
                        src={newRefuel.imageBefore}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Camera size={20} />
                    )}
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) =>
                        handleFileRead(e.target.files[0], (res) =>
                          setNewRefuel({ ...newRefuel, imageBefore: res })
                        )
                      }
                    />
                  </label>
                </div>
                <div>
                  <label className="text-xs block mb-1">Ảnh Sau</label>
                  <label className="block aspect-video border-2 border-dashed rounded flex items-center justify-center cursor-pointer overflow-hidden bg-slate-50">
                    {newRefuel.imageAfter ? (
                      <img
                        src={newRefuel.imageAfter}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Camera size={20} />
                    )}
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) =>
                        handleFileRead(e.target.files[0], (res) =>
                          setNewRefuel({ ...newRefuel, imageAfter: res })
                        )
                      }
                    />
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button
                  onClick={() => setShowRefuelModal(false)}
                  className="px-4 py-2 text-slate-600 bg-slate-100 rounded font-bold"
                >
                  Hủy
                </button>
                <button
                  onClick={handleAddRefuel}
                  className="px-4 py-2 bg-orange-500 text-white rounded font-bold"
                >
                  Lưu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LIGHTBOX */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <img
            src={previewImage}
            className="max-w-full max-h-full rounded shadow-2xl"
          />
          <button className="absolute top-4 right-4 text-white">
            <X size={32} />
          </button>
        </div>
      )}
    </div>
  );
};
// --- MODULE: UTILITY PANEL (FIXED IMAGE, MONTH FILTER & SYNC) ---
const UtilityPanel = ({ isLoggedIn }) => {
  // 1. CHỌN THÁNG MẶC ĐỊNH (Tháng hiện tại)
  const [monthFilter, setMonthFilter] = useState("2025-10"); // Mặc định tháng 10/2025 như hình
  const [typeFilter, setTypeFilter] = useState("all");
  const [previewImage, setPreviewImage] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    tenant: "",
    location: "",
    type: "electricity",
  });

  // 2. AUTO-SAVE & INIT DATA
  // Tự động gán tháng "2025-10" cho dữ liệu cũ chưa có trường 'month'
// --- Code cũ: const [utilityData...] = useState(localStorage...)  <-- XÓA CÁI NÀY
// --- Code mới:
const [utilityData, setUtilityData] = useState([]);

useEffect(() => {
  const fetchUtility = async () => {
    const { data, error } = await supabase.from('utility_readings').select('*');
    if (data) {
      // Chuyển đổi tên cột từ SQL (snake_case) sang React (camelCase)
      const formatted = data.map(item => ({
        ...item,
        oldIndex: item.old_index,
        newIndex: item.new_index,
        lastMonthUsage: item.last_month_usage
      }));
      setUtilityData(formatted);
    }
    if (error) console.log("Lỗi tải điện nước:", error);
  };
  fetchUtility();
}, []);

  // 3. LỌC DỮ LIỆU THEO THÁNG & LOẠI
  const filteredData = utilityData.filter((item) => {
    const matchMonth = item.month === monthFilter;
    const matchType =
      typeFilter === "all" ||
      (typeFilter === "electricity" &&
        (item.type === "electricity" || item.type === "public_elec")) ||
      (typeFilter === "water" &&
        (item.type === "water" || item.type === "public_water"));
    return matchMonth && matchType;
  });

  // 4. TÍNH TOÁN TỔNG (Dựa trên dữ liệu đã lọc)
  const totalElec = filteredData
    .filter((i) => i.type.includes("elec"))
    .reduce((a, b) => a + (b.newIndex - b.oldIndex), 0);

  const totalWater = filteredData
    .filter((i) => i.type.includes("water"))
    .reduce((a, b) => a + (b.newIndex - b.oldIndex), 0);

  // --- HÀM CẬP NHẬT DỮ LIỆU ---
  // Nhớ thêm từ khóa async
  const handleValueChange = async (id, field, value) => {
    const newValue = parseInt(value) || 0;

    // 1. Cập nhật giao diện (UI)
    setUtilityData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: newValue } : item))
    );

    // 2. Chuẩn bị tên cột cho khớp với SQL (SQL dùng snake_case)
    let dbField = field;
    if (field === 'oldIndex') dbField = 'old_index';
    if (field === 'newIndex') dbField = 'new_index';
    
    // 3. Gửi lên Supabase - THÊM ĐOẠN NÀY
    await supabase
      .from('utility_readings')
      .update({ [dbField]: newValue })
      .eq('id', id);
  };

  // --- HÀM XỬ LÝ ẢNH (BASE64) ---
  const handleUtilityImage = (id, field, base64String) => {
    setUtilityData((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, images: { ...item.images, [field]: base64String } }
          : item
      )
    );
  };

  const handleDeleteImage = (id, field) => {
    setUtilityData((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, images: { ...item.images, [field]: null } }
          : item
      )
    );
  };

  // --- HÀM XÓA DÒNG ---
  const handleDeleteRow = (id) => {
    if (window.confirm("Bạn chắc chắn muốn xóa dòng dữ liệu này?")) {
      setUtilityData((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // --- HÀM THÊM KHÁCH HÀNG MỚI (Tự động gán vào tháng đang chọn) ---
// --- HÀM THÊM KHÁCH HÀNG MỚI (ĐÃ SỬA ĐỔI ĐỂ LƯU SUPABASE) ---
const handleAddCustomer = async () => {
  if (!newCustomer.tenant) return alert("Vui lòng nhập tên khách hàng!");

  const newId = `U-${Date.now()}`;

  // 1. Tạo dữ liệu để gửi lên Supabase (Lưu ý: Tên cột phải là snake_case như SQL)
  const dbRow = {
    id: newId,
    tenant: newCustomer.tenant,
    location: newCustomer.location,
    type: newCustomer.type,
    old_index: 0,
    new_index: 0,
    last_month_usage: 0,
    month: monthFilter, // Lưu vào tháng đang chọn
    images: { old: null, new: null }
  };

  // 2. Tạo dữ liệu để hiển thị lên Web (React dùng camelCase)
  const uiRow = {
    ...dbRow,
    oldIndex: 0,        // Khớp với code hiển thị
    newIndex: 0,        // Khớp với code hiển thị
    lastMonthUsage: 0   // Khớp với code hiển thị
  };

  // Cập nhật giao diện ngay lập tức
  setUtilityData([uiRow, ...utilityData]);
  setShowAddModal(false);
  setNewCustomer({ tenant: "", location: "", type: "electricity" });

  // 3. Gửi lên Supabase (QUAN TRỌNG)
  const { error } = await supabase.from('utility_readings').insert([dbRow]);
  
  if (error) {
    alert("Lỗi lưu dữ liệu: " + error.message);
    console.error(error);
  }
};

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header & Stats */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Zap className="text-yellow-500" /> Quản Lý Điện & Nước
        </h2>
        {isLoggedIn && (
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow font-bold text-sm hover:bg-blue-700"
          >
            <Plus size={16} /> Thêm Khách Hàng
          </button>
        )}
      </div>

      {/* Bộ Lọc & Tổng Quan */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Ô Chọn Tháng */}
        <div className="bg-white p-3 rounded-xl border shadow-sm">
          <label className="block text-[10px] text-slate-500 font-bold uppercase mb-1">
            Chọn tháng ghi chỉ số
          </label>
          <input
            type="month"
            className="w-full p-1.5 border rounded text-sm font-bold text-slate-700 outline-none focus:border-blue-500"
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
          />
        </div>

        {/* Ô Chọn Loại */}
        <div className="bg-white p-3 rounded-xl border shadow-sm">
          <label className="block text-[10px] text-slate-500 font-bold uppercase mb-1">
            Loại tiện ích
          </label>
          <select
            className="w-full p-1.5 border rounded text-sm outline-none focus:border-blue-500"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">Tất cả</option>
            <option value="electricity">Điện (kWh)</option>
            <option value="water">Nước (m3)</option>
          </select>
        </div>

        {/* Thẻ Tổng Điện */}
        <div className="bg-yellow-50 p-3 rounded-xl border border-yellow-100 shadow-sm flex items-center gap-3">
          <div className="p-2 bg-white text-yellow-600 rounded-full shadow-sm">
            <Zap size={20} />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-800">
              {totalElec.toLocaleString()}
            </div>
            <div className="text-[10px] text-slate-500 font-bold uppercase">
              kWh tiêu thụ
            </div>
          </div>
        </div>

        {/* Thẻ Tổng Nước */}
        <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 shadow-sm flex items-center gap-3">
          <div className="p-2 bg-white text-blue-600 rounded-full shadow-sm">
            <Droplets size={20} />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-800">
              {totalWater.toLocaleString()}
            </div>
            <div className="text-[10px] text-slate-500 font-bold uppercase">
              m3 tiêu thụ
            </div>
          </div>
        </div>
      </div>

      {/* Bảng Dữ Liệu */}
      <div className="flex-1 bg-white rounded-xl border shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-auto flex-1">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b sticky top-0 z-10 text-xs uppercase">
              <tr>
                <th className="px-4 py-3">Khách Hàng / Khu Vực</th>
                <th className="px-4 py-3 text-center">Loại</th>
                <th className="px-4 py-3 text-right">Chỉ Số Cũ</th>
                <th className="px-4 py-3 text-right">Chỉ Số Mới</th>
                <th className="px-4 py-3 text-right">Tiêu Thụ</th>
                <th className="px-4 py-3 text-center">Ảnh Trước</th>
                <th className="px-4 py-3 text-center">Ảnh Sau</th>
                {isLoggedIn && (
                  <th className="px-4 py-3 text-center w-10">#</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.length > 0 ? (
                filteredData.map((item) => {
                  const usage = item.newIndex - item.oldIndex;
                  const isNegative = usage < 0; // Cảnh báo nếu chỉ số mới nhỏ hơn cũ

                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-slate-50 transition-colors group ${
                        item.type.includes("public") ? "bg-slate-50/50" : ""
                      }`}
                    >
                      <td className="px-4 py-3">
                        {isLoggedIn ? (
                          <div className="flex flex-col gap-1">
                            <input
                              type="text"
                              className="font-bold text-slate-800 border-b border-dashed border-transparent hover:border-slate-300 focus:border-blue-500 outline-none bg-transparent w-full text-sm"
                              value={item.tenant}
                              onChange={(e) =>
                                handleTextChange(
                                  item.id,
                                  "tenant",
                                  e.target.value
                                )
                              }
                            />
                            <input
                              type="text"
                              className="text-xs text-slate-500 border-b border-dashed border-transparent hover:border-slate-300 focus:border-blue-500 outline-none bg-transparent w-full"
                              value={item.location}
                              onChange={(e) =>
                                handleTextChange(
                                  item.id,
                                  "location",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        ) : (
                          <>
                            <div
                              className={`font-bold text-sm ${
                                item.type.includes("public")
                                  ? "text-slate-600"
                                  : "text-slate-800"
                              }`}
                            >
                              {item.tenant}
                            </div>
                            <div className="text-xs text-slate-500">
                              {item.location}
                            </div>
                          </>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                            item.type.includes("electricity")
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {item.type.includes("electricity") ? "Điện" : "Nước"}
                        </span>
                      </td>

                      {/* Cột Chỉ Số Cũ */}
                      <td className="px-4 py-3 text-right">
                        {isLoggedIn ? (
                          <input
                            type="number"
                            className="w-24 text-right border rounded p-1.5 text-slate-600 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                            value={item.oldIndex}
                            onChange={(e) =>
                              handleValueChange(
                                item.id,
                                "oldIndex",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          <span className="text-slate-500 font-mono">
                            {item.oldIndex.toLocaleString()}
                          </span>
                        )}
                      </td>

                      {/* Cột Chỉ Số Mới */}
                      <td className="px-4 py-3 text-right">
                        {isLoggedIn ? (
                          <input
                            type="number"
                            className={`w-24 text-right border rounded p-1.5 font-bold bg-white focus:ring-2 outline-none ${
                              isNegative
                                ? "border-red-500 text-red-600 focus:ring-red-200"
                                : "text-slate-800 focus:ring-blue-500"
                            }`}
                            value={item.newIndex}
                            onChange={(e) =>
                              handleValueChange(
                                item.id,
                                "newIndex",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          <span className="font-bold text-slate-800 font-mono">
                            {item.newIndex.toLocaleString()}
                          </span>
                        )}
                      </td>

                      {/* Cột Tiêu Thụ (Tự động tính) */}
                      <td className="px-4 py-3 text-right">
                        <div
                          className={`font-bold font-mono text-base ${
                            usage > item.lastMonthUsage
                              ? "text-red-500"
                              : "text-emerald-600"
                          }`}
                        >
                          {usage.toLocaleString()}
                        </div>
                        <div className="text-[10px] flex items-center justify-end gap-1 opacity-70">
                          {usage > item.lastMonthUsage ? (
                            <>
                              <ArrowUpRight
                                size={10}
                                className="text-red-500"
                              />{" "}
                              Tăng
                            </>
                          ) : (
                            <>
                              <ArrowDownRight
                                size={10}
                                className="text-emerald-500"
                              />{" "}
                              Giảm
                            </>
                          )}
                        </div>
                      </td>

                      {/* Ảnh Trước */}
                      <td className="px-4 py-3 text-center">
                        <UtilityImageCell
                          src={item.images.old}
                          isLoggedIn={isLoggedIn}
                          onUpload={(base64) =>
                            handleUtilityImage(item.id, "old", base64)
                          }
                          onDelete={() => handleDeleteImage(item.id, "old")}
                          onView={setPreviewImage}
                        />
                      </td>

                      {/* Ảnh Sau */}
                      <td className="px-4 py-3 text-center">
                        <UtilityImageCell
                          src={item.images.new}
                          isLoggedIn={isLoggedIn}
                          onUpload={(base64) =>
                            handleUtilityImage(item.id, "new", base64)
                          }
                          onDelete={() => handleDeleteImage(item.id, "new")}
                          onView={setPreviewImage}
                        />
                      </td>

                      {/* Nút Xóa Dòng */}
                      {isLoggedIn && (
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => handleDeleteRow(item.id)}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                            title="Xóa dòng này"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      )}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="p-8 text-center text-slate-400 italic"
                  >
                    Chưa có dữ liệu cho tháng {monthFilter}. <br />
                    {isLoggedIn ? "Hãy bấm 'Thêm Khách Hàng' để bắt đầu." : ""}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Thêm Mới */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in">
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-2xl">
            <h3 className="font-bold text-lg mb-4 text-slate-800">
              Thêm Khách Hàng (Tháng {monthFilter})
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Tên Công Ty / Khu Vực
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  value={newCustomer.tenant}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, tenant: e.target.value })
                  }
                  placeholder="VD: CÔNG TY ABC..."
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Vị Trí Cụ Thể
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  value={newCustomer.location}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, location: e.target.value })
                  }
                  placeholder="VD: Khu A - T2..."
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Loại Tiện Ích
                </label>
                <select
                  className="w-full p-2 border rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  value={newCustomer.type}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, type: e.target.value })
                  }
                >
                  <option value="electricity">Điện</option>
                  <option value="water">Nước</option>
                  <option value="public_elec">Điện Công Cộng</option>
                  <option value="public_water">Nước Công Cộng</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t mt-2">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded text-slate-600 bg-slate-100 hover:bg-slate-200 font-medium text-sm"
                >
                  Hủy
                </button>
                <button
                  onClick={handleAddCustomer}
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 font-medium text-sm shadow-lg"
                >
                  Lưu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Xem Ảnh Phóng To */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setPreviewImage(null)}
        >
          <img
            src={previewImage}
            className="max-w-full max-h-full rounded shadow-2xl"
            alt="Preview"
          />
          <button className="absolute top-4 right-4 text-white hover:text-slate-300">
            <X size={32} />
          </button>
        </div>
      )}
    </div>
  );
};

// --- OTHER MODULES (MaintenancePanel, SupportPanel, EditModal, WelcomeModal, App) ---
// (Giữ nguyên như trước)

// --- MODULE 3: MAINTENANCE PANEL (ĐÃ SỬA LỖI LƯU & CUỘN) ---
// --- MODULE 3: MAINTENANCE PANEL (FIX CUỘN DỌC & AUTO-SAVE) ---
// --- MODULE 3: MAINTENANCE PANEL (FIX SCROLLBAR TRIỆT ĐỂ) ---
// --- MODULE 3: MAINTENANCE PANEL (ĐÃ CÓ LỌC THÁNG & NÚT XÓA) ---
const MaintenancePanel = ({ isLoggedIn, tickets, setTickets }) => {
  // 1. AUTO-SAVE

  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [categories, setCategories] = useState(MAINTENANCE_CATEGORIES);
  const [chartMonth, setChartMonth] = useState(""); // State lưu tháng đang chọn

  const initialTicketState = {
    id: "",
    unitId: "",
    date: new Date().toISOString().split("T")[0],
    category: "",
    subCategory: "",
    desc: "",
    priority: "medium",
    reporter: "",
    status: "new",
  };
  const [currentTicket, setCurrentTicket] = useState(initialTicketState);
  const [isCustomCat, setIsCustomCat] = useState(false);
  const [isCustomSub, setIsCustomSub] = useState(false);

  const columns = [
    {
      id: "new",
      title: "Mới tiếp nhận",
      color: "bg-slate-100 border-slate-200",
      textColor: "text-slate-700",
    },
    {
      id: "processing",
      title: "Đang xử lý",
      color: "bg-blue-50 border-blue-200",
      textColor: "text-blue-700",
    },
    {
      id: "completed",
      title: "Đã hoàn thành",
      color: "bg-emerald-50 border-emerald-200",
      textColor: "text-emerald-700",
    },
  ];

  // --- LOGIC LỌC DỮ LIỆU ---
  // Tạo danh sách đã lọc dựa trên chartMonth
  const filteredTickets = useMemo(() => {
    return tickets.filter((t) => !chartMonth || t.date.startsWith(chartMonth));
  }, [tickets, chartMonth]);

  // --- TÍNH TOÁN BIỂU ĐỒ (Dựa trên danh sách ĐÃ LỌC) ---
  const ticketStats = useMemo(() => {
    return [
      {
        name: "Mới tiếp nhận",
        count: filteredTickets.filter((t) => t.status === "new").length,
        color: "#64748b",
      },
      {
        name: "Đang xử lý",
        count: filteredTickets.filter((t) => t.status === "processing").length,
        color: "#3b82f6",
      },
      {
        name: "Đã hoàn thành",
        count: filteredTickets.filter((t) => t.status === "completed").length,
        color: "#10b981",
      },
    ];
  }, [filteredTickets]);

  // --- CÁC HÀM XỬ LÝ (THÊM, SỬA, XÓA) ---
  const openAddModal = () => {
    if (!isLoggedIn) return;
    setCurrentTicket({
      ...initialTicketState,
      reporter: localStorage.getItem("last_reporter_name") || "",
    });
    setIsEditing(false);
    setShowForm(true);
  };

  const openEditModal = (ticket) => {
    if (!isLoggedIn) return;
    setCurrentTicket(ticket);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleSaveTicket = async () => {
    if (!currentTicket.unitId || !currentTicket.category)
      return alert("Vui lòng điền đầy đủ thông tin!");

    // Chuẩn bị dữ liệu (mapping sang tên cột SQL snake_case)
    const ticketData = {
      unit_id: currentTicket.unitId,
      date: currentTicket.date,
      category: currentTicket.category,
      sub_category: currentTicket.subCategory,
      desc_content: currentTicket.desc,
      priority: currentTicket.priority,
      reporter: currentTicket.reporter,
      status: currentTicket.status
    };

    if (isEditing) {
      // 1. Cập nhật UI ngay
      setTickets(tickets.map((t) => (t.id === currentTicket.id ? currentTicket : t)));
      // 2. Gửi lên Supabase
      const { error } = await supabase
        .from('maintenance_tickets')
        .update(ticketData)
        .eq('id', currentTicket.id);
      if (error) alert("Lỗi cập nhật: " + error.message);

    } else {
      const newId = `MT-${Date.now()}`;
      const newTicket = { ...currentTicket, id: newId };
      
      // 1. Cập nhật UI
      setTickets([...tickets, newTicket]);
      // 2. Gửi lên Supabase
      const { error } = await supabase
        .from('maintenance_tickets')
        .insert([{ ...ticketData, id: newId }]);
      if (error) alert("Lỗi tạo mới: " + error.message);
    }
    setShowForm(false);
  };

  // --- HÀM XÓA PHIẾU ---
  const handleDeleteTicket = async (e, id) => {
    e.stopPropagation();
    if (window.confirm(`Bạn có chắc muốn xóa phiếu ${id} không?`)) {
      // 1. Xóa trên UI
      setTickets((prev) => prev.filter((t) => t.id !== id));
      // 2. Xóa trên Supabase
      const { error } = await supabase.from('maintenance_tickets').delete().eq('id', id);
      if (error) alert("Lỗi xóa: " + error.message);
    }
  };

  const handleDragStart = (e, ticketId) => {
    if (!isLoggedIn) return;
    e.dataTransfer.setData("ticketId", ticketId);
  };
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e, status) => {
    if (!isLoggedIn) return;
    const ticketId = e.dataTransfer.getData("ticketId");
    setTickets(
      tickets.map((t) => (t.id === ticketId ? { ...t, status: status } : t))
    );
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-700 border-red-200";
      case "high":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "medium":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] gap-4">
      {/* Header */}
      <div className="flex justify-between items-center shrink-0">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Wrench className="text-blue-600" /> Quản Lý Bảo Trì & Sự Cố
        </h2>
        {isLoggedIn && (
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 font-medium text-sm transition-colors"
          >
            <Plus size={16} /> Báo Cáo Mới
          </button>
        )}
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-64 shrink-0">
        <div className="lg:col-span-2 bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-2 shrink-0">
            <h3 className="font-bold text-slate-700 flex items-center gap-2">
              <BarChart2 size={16} /> Tổng Hợp Tiến Độ
            </h3>

            {/* --- BỘ LỌC THÁNG --- */}
            <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-lg border border-slate-200">
              <span className="text-xs font-bold text-slate-500 pl-2">
                Lọc:
              </span>
              <input
                type="month"
                className="text-xs border-none bg-transparent outline-none font-bold text-slate-700 cursor-pointer"
                value={chartMonth}
                onChange={(e) => setChartMonth(e.target.value)}
              />
              {chartMonth && (
                <button
                  onClick={() => setChartMonth("")}
                  className="text-red-500 hover:bg-red-100 rounded p-1"
                  title="Xóa lọc"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </div>

          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={ticketStats}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" allowDecimals={false} />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={100}
                  style={{ fontSize: "12px", fontWeight: 500 }}
                />
                <RechartsTooltip cursor={{ fill: "transparent" }} />
                <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={24}>
                  {ticketStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center gap-3">
          {ticketStats.map((stat, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: stat.color }}
                ></div>
                <span className="text-sm font-medium text-slate-600">
                  {stat.name}
                </span>
              </div>
              <span className="text-xl font-bold text-slate-800">
                {stat.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* --- KANBAN BOARD (DÙNG filteredTickets ĐỂ HIỂN THỊ) --- */}
      <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-3 gap-6 pb-2">
        {columns.map((col) => (
          <div
            key={col.id}
            className={`rounded-xl border flex flex-col h-full shadow-sm overflow-hidden ${col.color}`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, col.id)}
          >
            <div className="p-4 border-b border-black/5 flex justify-between items-center bg-white/60 backdrop-blur-sm shrink-0">
              <h3
                className={`font-bold uppercase text-xs tracking-wider ${col.textColor}`}
              >
                {col.title}
              </h3>
              <span className="bg-white px-2 py-1 rounded-full text-xs font-bold text-slate-600 border shadow-sm">
                {filteredTickets.filter((t) => t.status === col.id).length}
              </span>
            </div>

            <div className="p-3 overflow-y-auto flex-1 space-y-3 custom-scrollbar">
              {filteredTickets
                .filter((t) => t.status === col.id)
                .map((ticket) => (
                  <div
                    key={ticket.id}
                    draggable={isLoggedIn}
                    onDragStart={(e) => handleDragStart(e, ticket.id)}
                    onClick={() => openEditModal(ticket)}
                    className={`bg-white p-4 rounded-lg shadow-sm border border-slate-200/80 ${
                      isLoggedIn
                        ? "cursor-pointer hover:shadow-md hover:border-blue-400 hover:-translate-y-0.5"
                        : ""
                    } transition-all group relative pr-8`} // Thêm pr-8 để tránh text đè lên nút xóa
                  >
                    {/* --- NÚT XÓA & SỬA (Hiện khi hover) --- */}
                    {isLoggedIn && (
                      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 p-1 rounded border shadow-sm z-10">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditModal(ticket);
                          }}
                          className="p-1 hover:bg-blue-50 text-blue-600 rounded"
                          title="Sửa"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={(e) => handleDeleteTicket(e, ticket.id)}
                          className="p-1 hover:bg-red-50 text-red-500 rounded"
                          title="Xóa vĩnh viễn"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    )}

                    <div className="flex justify-between items-start mb-2">
                      <span className="font-mono text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                        {ticket.id}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase border ${getPriorityBadge(
                          ticket.priority
                        )}`}
                      >
                        {ticket.priority}
                      </span>
                    </div>
                    <h4
                      className="font-bold text-slate-800 text-sm mb-1 line-clamp-2"
                      title={ticket.category}
                    >
                      {ticket.category}
                    </h4>
                    <div
                      className="text-xs text-slate-500 mb-2 line-clamp-2"
                      title={ticket.desc}
                    >
                      {ticket.desc}
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-slate-400 border-t pt-2 border-slate-50">
                      <span className="flex items-center gap-1">
                        <MapPin size={10} /> {ticket.unitId}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={10} /> {ticket.date}
                      </span>
                    </div>
                  </div>
                ))}
              {filteredTickets.filter((t) => t.status === col.id).length ===
                0 && (
                <div className="h-24 border-2 border-dashed border-slate-300/50 rounded-lg flex items-center justify-center text-slate-400 text-xs italic">
                  {chartMonth ? `Không có phiếu tháng ${chartMonth}` : "Trống"}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form (Giữ nguyên) */}
      {showForm && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-[70] p-4 animate-in fade-in zoom-in duration-200">
          <div className="bg-white rounded-xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <h3 className="font-bold text-lg text-slate-800">
                {isEditing ? "Cập Nhật Phiếu" : "Tạo Phiếu Mới"}
              </h3>
              <button onClick={() => setShowForm(false)}>
                <X size={20} className="text-slate-400 hover:text-red-500" />
              </button>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Vị Trí *
                  </label>
                  <input
                    className="w-full p-2 border rounded text-sm"
                    value={currentTicket.unitId}
                    onChange={(e) =>
                      setCurrentTicket({
                        ...currentTicket,
                        unitId: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Ngày
                  </label>
                  <input
                    type="date"
                    className="w-full p-2 border rounded text-sm"
                    value={currentTicket.date}
                    onChange={(e) =>
                      setCurrentTicket({
                        ...currentTicket,
                        date: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Hạng Mục *
                  </label>
                  {isCustomCat ? (
                    <input
                      className="w-full p-2 border rounded text-sm"
                      value={currentTicket.category}
                      onChange={(e) =>
                        setCurrentTicket({
                          ...currentTicket,
                          category: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <select
                      className="w-full p-2 border rounded text-sm"
                      value={currentTicket.category}
                      onChange={(e) =>
                        setCurrentTicket({
                          ...currentTicket,
                          category: e.target.value,
                        })
                      }
                    >
                      <option value="">-- Chọn --</option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.label}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  )}
                  <button
                    onClick={() => setIsCustomCat(!isCustomCat)}
                    className="text-[10px] text-blue-600 mt-1 hover:underline"
                  >
                    {isCustomCat ? "Chọn danh sách" : "Nhập mới"}
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Chi Tiết
                  </label>
                  <input
                    className="w-full p-2 border rounded text-sm"
                    value={currentTicket.subCategory}
                    onChange={(e) =>
                      setCurrentTicket({
                        ...currentTicket,
                        subCategory: e.target.value,
                      })
                    }
                    placeholder="Chi tiết kỹ thuật..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Mức Độ
                  </label>
                  <select
                    className="w-full p-2 border rounded text-sm"
                    value={currentTicket.priority}
                    onChange={(e) =>
                      setCurrentTicket({
                        ...currentTicket,
                        priority: e.target.value,
                      })
                    }
                  >
                    <option value="low">Thấp</option>
                    <option value="medium">Trung bình</option>
                    <option value="high">Cao</option>
                    <option value="critical">Khẩn cấp</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Trạng Thái
                  </label>
                  <select
                    className="w-full p-2 border rounded text-sm"
                    value={currentTicket.status}
                    onChange={(e) =>
                      setCurrentTicket({
                        ...currentTicket,
                        status: e.target.value,
                      })
                    }
                  >
                    <option value="new">Mới tiếp nhận</option>
                    <option value="processing">Đang xử lý</option>
                    <option value="completed">Đã hoàn thành</option>
                  </select>
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Mô Tả
                </label>
                <textarea
                  className="w-full p-2 border rounded text-sm h-24 resize-none"
                  value={currentTicket.desc}
                  onChange={(e) =>
                    setCurrentTicket({ ...currentTicket, desc: e.target.value })
                  }
                ></textarea>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded text-sm text-slate-600 hover:bg-slate-200"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveTicket}
                className="px-6 py-2 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- MODULE 2: SUPPORT PANEL (CSKH - GIỮ NGUYÊN) ---
// --- MODULE 2: SUPPORT PANEL (FIXED IMAGE UPLOAD & ADD DELETE) ---
const SupportPanel = ({ isLoggedIn }) => {
  // 1. AUTO-SAVE: Lấy dữ liệu từ LocalStorage
 // --- STATE MỚI ---
 const [tickets, setTickets] = useState([]);

 // Tải dữ liệu từ Supabase
 useEffect(() => {
   const fetchSupport = async () => {
     const { data, error } = await supabase
       .from('support_tickets')
       .select('*')
       .order('created', { ascending: false });
     
     if (data) setTickets(data);
     if (error) console.log("Lỗi Support:", error);
   };
   fetchSupport();
 }, []);

  const [selectedTicketId, setSelectedTicketId] = useState(tickets[0]?.id);
  const [showForm, setShowForm] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [filters, setFilters] = useState({
    month: "",
    priority: "all",
    status: "all",
  });
  const quickUploadRef = useRef(null);

  const [newReq, setNewReq] = useState({
    title: "",
    location: "",
    category: "",
    type: "medium",
    desc: "",
    reporter: "",
    created: new Date().toISOString().slice(0, 16),
  });

  const supportStats = useMemo(
    () => [
      {
        name: "Chờ",
        value: tickets.filter((t) => t.status === "pending").length,
        color: "#94a3b8",
      },
      {
        name: "Đang xử lý",
        value: tickets.filter(
          (t) => t.status === "in_progress" || t.status === "assigned"
        ).length,
        color: "#3b82f6",
      },
      {
        name: "Hoàn thành",
        value: tickets.filter((t) => t.status === "completed").length,
        color: "#10b981",
      },
    ],
    [tickets]
  );

  const activeTicket = tickets.find((t) => t.id === selectedTicketId) || null;
  const processingCount = tickets.filter(
    (t) => t.status !== "completed"
  ).length;
  const ratedTickets = tickets.filter((t) => t.rating > 0);
  const averageRating =
    ratedTickets.length > 0
      ? (
          ratedTickets.reduce((a, b) => a + b.rating, 0) / ratedTickets.length
        ).toFixed(1)
      : 0;

  // --- HÀM XỬ LÝ ẢNH MỚI (BASE64) ---
  const handleUploadImage = (stage, file) => {
    if (!activeTicket || !file) return;

    // Kiểm tra kích thước file (giới hạn 500KB để tránh đầy bộ nhớ localStorage)
    if (file.size > 500 * 1024) {
      alert("File quá lớn! Vui lòng chọn ảnh dưới 500KB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result; // Chuỗi Base64 bền vững
      const updatedImages = { ...activeTicket.images, [stage]: base64String };
      setTickets(
        tickets.map((t) =>
          t.id === activeTicket.id ? { ...t, images: updatedImages } : t
        )
      );
    };
    reader.readAsDataURL(file);
  };

  const handleQuickUploadChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleUploadImage("after", e.target.files[0]);
    }
  };

  const handleDeleteImage = (stage) => {
    if (activeTicket) {
      const updatedImages = { ...activeTicket.images, [stage]: null };
      setTickets(
        tickets.map((t) =>
          t.id === activeTicket.id ? { ...t, images: updatedImages } : t
        )
      );
    }
  };

  // --- HÀM XÓA YÊU CẦU ---
  const handleDeleteTicket = (e, id) => {
    e.stopPropagation();
    if (
      window.confirm(
        "Bạn có chắc muốn xóa yêu cầu này? Dữ liệu sẽ mất vĩnh viễn."
      )
    ) {
      const newTickets = tickets.filter((t) => t.id !== id);
      setTickets(newTickets);
      // Nếu đang xem ticket bị xóa, chuyển về ticket đầu tiên hoặc null
      if (selectedTicketId === id) {
        setSelectedTicketId(newTickets[0]?.id || null);
      }
    }
  };

  const filteredTickets = tickets.filter((t) => {
    const matchMonth = filters.month
      ? t.created.startsWith(filters.month)
      : true;
    const matchPriority =
      filters.priority === "all" || t.type === filters.priority;
    const matchStatus = filters.status === "all" || t.status === filters.status;
    return matchMonth && matchPriority && matchStatus;
  });

  const handleAddRequest = async () => {
    if (!newReq.title) return alert("Vui lòng nhập tiêu đề!");
    
    const newId = `REQ-${Date.now()}`;
    const ticketObj = {
      id: newId,
      title: newReq.title,
      location: newReq.location,
      category: newReq.category,
      type: newReq.type,
      description: newReq.desc,
      reporter: newReq.reporter,
      created: newReq.created.replace("T", " "),
      status: "pending",
      progress: 0,
      eta: "Chờ tiếp nhận",
      rating: 0,
      images: { before: null, during: null, after: null } // Lưu dạng JSON
    };

    // UI Update
    setTickets([ticketObj, ...tickets]);
    setShowForm(false);
    
    // DB Insert
    await supabase.from('support_tickets').insert([ticketObj]);
    
    // Reset form
    setNewReq({ ...newReq, title: "", desc: "" }); 
    if (newReq.reporter) localStorage.setItem("last_reporter_name", newReq.reporter);
  };

  const updateTicketProgress = (val) => {
    if (activeTicket)
      setTickets(
        tickets.map((t) =>
          t.id === activeTicket.id
            ? {
                ...t,
                progress: val,
                status: val === 100 ? "completed" : "in_progress",
                eta: val === 100 ? "Đã hoàn thành" : t.eta,
              }
            : t
        )
      );
  };

  const handleStepClick = (stepIndex) => {
    if (!isLoggedIn) return;
    let newProgress = 0;
    if (stepIndex === 1) newProgress = 0;
    else if (stepIndex === 2) newProgress = 25;
    else if (stepIndex === 3) newProgress = 50;
    else if (stepIndex === 4) newProgress = 100;
    updateTicketProgress(newProgress);
  };

  const handleRate = () => {
    if (activeTicket) {
      setTickets(
        tickets.map((t) =>
          t.id === activeTicket.id
            ? { ...t, rating: rating, feedback: feedbackText }
            : t
        )
      );
      setShowRatingModal(false);
      alert("Cảm ơn đánh giá!");
    }
  };

  const getStatusStep = (status) => {
    const map = { pending: 1, assigned: 2, in_progress: 3, completed: 4 };
    return map[activeTicket?.status] || 0;
  };

  const getPriorityColor = (type) => {
    switch (type) {
      case "emergency":
        return "text-red-600 bg-red-100 border-red-200";
      case "medium":
        return "text-amber-600 bg-amber-100 border-amber-200";
      case "low":
        return "text-emerald-600 bg-emerald-100 border-emerald-200";
      default:
        return "text-slate-600 bg-slate-100";
    }
  };

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-40 shrink-0">
        <div className="bg-white p-4 rounded-xl border shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <LifeBuoy size={20} />
            </div>
            <span className="text-sm font-bold text-slate-500">Đang xử lý</span>
          </div>
          <div className="text-3xl font-bold text-slate-800">
            {processingCount}
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
              <Star size={20} />
            </div>
            <span className="text-sm font-bold text-slate-500">Đánh giá</span>
          </div>
          <div className="text-3xl font-bold text-slate-800">
            {averageRating}/5
          </div>
        </div>
        <div className="md:col-span-2 bg-white p-4 rounded-xl border shadow-sm flex items-center justify-between">
          <div className="flex flex-col justify-center gap-2">
            <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <PieIcon size={16} /> Trạng thái yêu cầu
            </h3>
            <div className="space-y-1">
              {supportStats.map((d, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: d.color }}
                  ></div>
                  <span className="text-slate-500 w-20">{d.name}</span>
                  <span className="font-bold text-slate-700">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="w-32 h-32">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={supportStats}
                  cx="50%"
                  cy="50%"
                  innerRadius={25}
                  outerRadius={40}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {supportStats.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="none"
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
        {/* List Ticket */}
        <div className="w-full lg:w-1/3 bg-white rounded-xl border shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b bg-slate-50 flex flex-col gap-3 shrink-0">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-800 flex gap-2">
                <MessageSquare size={18} /> Yêu cầu
              </h3>
              {isLoggedIn && (
                <button
                  onClick={() => setShowForm(true)}
                  className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg flex gap-1 hover:bg-blue-700"
                >
                  <Plus size={12} /> Tạo mới
                </button>
              )}
            </div>
            <div className="flex gap-2">
              <input
                type="month"
                className="w-full border rounded px-2 py-1 text-xs outline-none"
                onChange={(e) =>
                  setFilters({ ...filters, month: e.target.value })
                }
              />
              <select
                className="w-full border rounded px-2 py-1 text-xs outline-none"
                onChange={(e) =>
                  setFilters({ ...filters, priority: e.target.value })
                }
              >
                <option value="all">Mọi mức độ</option>
                <option value="emergency">Khẩn cấp</option>
                <option value="medium">Trung bình</option>
                <option value="low">Thấp</option>
              </select>
            </div>
          </div>
          <div className="overflow-y-auto flex-1 p-2 space-y-2 custom-scrollbar">
            {filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                onClick={() => setSelectedTicketId(ticket.id)}
                className={`p-3 rounded-lg border cursor-pointer hover:shadow-md relative group ${
                  selectedTicketId === ticket.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-200 bg-white"
                }`}
              >
                {/* NÚT XÓA (HIỆN KHI HOVER) */}
                {isLoggedIn && (
                  <button
                    onClick={(e) => handleDeleteTicket(e, ticket.id)}
                    className="absolute top-2 right-2 p-1.5 bg-white/90 text-red-500 rounded border border-red-100 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 z-10 shadow-sm"
                    title="Xóa yêu cầu"
                  >
                    <Trash2 size={14} />
                  </button>
                )}

                <div className="flex justify-between mb-1">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${getPriorityColor(
                      ticket.type
                    )}`}
                  >
                    {ticket.type}
                  </span>
                  <span className="text-xs text-slate-400">
                    {ticket.created.split(" ")[0]}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-800 line-clamp-1 pr-6">
                  {ticket.title}
                </h4>
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>
                    <MapPin size={10} className="inline" /> {ticket.location}
                  </span>
                  <span
                    className={`font-bold ${
                      ticket.status === "completed"
                        ? "text-emerald-600"
                        : "text-blue-600"
                    }`}
                  >
                    {ticket.status === "completed" ? "Xong" : "Đang xử lý"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ticket Detail */}
        <div className="flex-1 flex flex-col gap-6 overflow-hidden">
          {activeTicket ? (
            <div className="bg-white rounded-xl border shadow-sm overflow-hidden flex flex-col h-full">
              <div className="p-6 border-b border-slate-100 shrink-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-slate-800 mb-2">
                      {activeTicket.title}
                    </h2>
                    <div className="flex gap-4 text-sm text-slate-500 items-center flex-wrap">
                      <span className="flex gap-1">
                        <Tag size={16} /> {activeTicket.category}
                      </span>
                      <span className="flex gap-1">
                        <Clock size={16} /> ETA:{" "}
                        <span className="text-blue-600 font-bold">
                          {activeTicket.eta}
                        </span>
                      </span>
                      {isLoggedIn && (
                        <button
                          onClick={() => quickUploadRef.current?.click()}
                          className="flex gap-1 ml-auto px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-bold hover:bg-emerald-100"
                        >
                          <Upload size={14} /> Tải ảnh nghiệm thu
                        </button>
                      )}
                      <input
                        type="file"
                        ref={quickUploadRef}
                        className="hidden"
                        onChange={handleQuickUploadChange}
                        accept="image/*"
                      />
                    </div>
                    <div className="mt-2 text-sm text-slate-600 bg-slate-50 p-2 rounded border">
                      Mô tả: {activeTicket.description}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {activeTicket.status === "completed" &&
                      !activeTicket.rating && (
                        <button
                          onClick={() => setShowRatingModal(true)}
                          className="px-4 py-2 bg-yellow-400 text-white rounded-lg font-bold shadow-md animate-bounce"
                        >
                          ★ Đánh giá
                        </button>
                      )}
                    {activeTicket.rating > 0 && (
                      <div className="flex items-center gap-1 text-yellow-500 font-bold bg-yellow-50 px-3 py-1 rounded-lg">
                        {activeTicket.rating}{" "}
                        <Star fill="currentColor" size={16} />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-50 border-b shrink-0">
                <h4 className="text-sm font-bold text-slate-700 mb-4 flex justify-between">
                  Tiến độ xử lý{" "}
                  {isLoggedIn && (
                    <span className="text-[10px] bg-blue-100 text-blue-700 px-2 rounded">
                      Kéo thanh trượt
                    </span>
                  )}
                </h4>
                <div className="mb-6 relative h-4 bg-slate-200 rounded-full">
                  <div
                    className="bg-blue-600 h-4 rounded-full transition-all"
                    style={{ width: `${activeTicket.progress}%` }}
                  ></div>
                  {isLoggedIn && (
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={activeTicket.progress}
                      onChange={(e) =>
                        updateTicketProgress(parseInt(e.target.value))
                      }
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  )}
                </div>
                <div className="flex justify-between relative">
                  <div className="absolute top-3 left-0 w-full h-0.5 bg-slate-200 -z-0"></div>
                  {["Tiếp nhận", "Kỹ thuật đến", "Đang sửa", "Hoàn thành"].map(
                    (s, i) => (
                      <div
                        key={i}
                        onClick={() => handleStepClick(i + 1)}
                        className={`relative z-10 flex flex-col items-center gap-2 ${
                          isLoggedIn ? "cursor-pointer hover:scale-105" : ""
                        } transition-transform`}
                      >
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 ${
                            getStatusStep(i + 1) >= i + 1
                              ? "bg-blue-600 border-blue-600 text-white"
                              : "bg-white border-slate-300 text-slate-400"
                          }`}
                        >
                          {getStatusStep(i + 1) >= i + 1 ? (
                            <CheckSquare size={12} />
                          ) : (
                            i + 1
                          )}
                        </div>
                        <span className="text-xs text-slate-500">{s}</span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Image Evidence Area */}
              <div className="p-6 overflow-y-auto flex-1">
                <h4 className="text-sm font-bold text-slate-700 mb-3 uppercase">
                  HÌNH ẢNH BÁO CÁO
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  <ImageUploader
                    label="TRƯỚC"
                    hasImage={activeTicket.images.before}
                    onUpload={(f) => handleUploadImage("before", f)}
                    onDelete={() => handleDeleteImage("before")}
                    onView={setPreviewImage}
                    isLoggedIn={isLoggedIn}
                  />
                  <ImageUploader
                    label="TRONG KHI LÀM"
                    hasImage={activeTicket.images.during}
                    onUpload={(f) => handleUploadImage("during", f)}
                    onDelete={() => handleDeleteImage("during")}
                    onView={setPreviewImage}
                    isLoggedIn={isLoggedIn}
                  />
                  <ImageUploader
                    label="SAU"
                    hasImage={activeTicket.images.after}
                    onUpload={(f) => handleUploadImage("after", f)}
                    onDelete={() => handleDeleteImage("after")}
                    onView={setPreviewImage}
                    isLoggedIn={isLoggedIn}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-slate-400 border rounded-xl bg-white">
              Chọn yêu cầu để xem chi tiết
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <img
            src={previewImage}
            className="max-w-full max-h-full rounded shadow-2xl"
          />
          <button className="absolute top-4 right-4 text-white">
            <X size={32} />
          </button>
        </div>
      )}

      {/* Create Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg p-6">
            <h3 className="font-bold text-lg mb-4">Tạo Yêu Cầu Mới</h3>
            <div className="space-y-3">
              <input
                className="w-full p-2 border rounded"
                placeholder="Tiêu đề..."
                value={newReq.title}
                onChange={(e) =>
                  setNewReq({ ...newReq, title: e.target.value })
                }
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  className="w-full p-2 border rounded"
                  placeholder="Vị trí..."
                  value={newReq.location}
                  onChange={(e) =>
                    setNewReq({ ...newReq, location: e.target.value })
                  }
                />
                <select
                  className="w-full p-2 border rounded"
                  onChange={(e) =>
                    setNewReq({ ...newReq, category: e.target.value })
                  }
                >
                  <option>Chọn danh mục</option>
                  {SUPPORT_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <textarea
                className="w-full p-2 border rounded h-24"
                placeholder="Mô tả..."
                value={newReq.desc}
                onChange={(e) => setNewReq({ ...newReq, desc: e.target.value })}
              ></textarea>
              <input
                className="w-full p-2 border rounded"
                placeholder="Tên người gửi..."
                value={newReq.reporter}
                onChange={(e) =>
                  setNewReq({ ...newReq, reporter: e.target.value })
                }
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded text-slate-600 hover:bg-slate-100"
              >
                Hủy
              </button>
              <button
                onClick={handleAddRequest}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Gửi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rating Modal */}
      {showRatingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 text-center w-80">
            <h3 className="font-bold text-lg mb-4">Đánh giá dịch vụ</h3>
            <div className="flex justify-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  onClick={() => setRating(s)}
                  className={`p-1 ${
                    rating >= s ? "text-yellow-400" : "text-slate-200"
                  }`}
                >
                  <Star size={32} fill="currentColor" />
                </button>
              ))}
            </div>
            <textarea
              className="w-full p-2 border rounded mb-4"
              placeholder="Nhận xét..."
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
            ></textarea>
            <button
              onClick={handleRate}
              className="w-full py-2 bg-blue-600 text-white rounded font-bold"
            >
              Gửi Đánh Giá
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const EditModal = ({ unit, onClose, onSave, isReadOnly }) => {
  const [isCustomIndustry, setIsCustomIndustry] = useState(false);
  const [form, setForm] = useState(unit);
  const handleChange = (e) => {
    if (isReadOnly) return;
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleTechChange = (e) => {
    if (isReadOnly) return;
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, tech: { ...prev.tech, [name]: value } }));
  };
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="px-6 py-4 border-b bg-slate-50 flex justify-between items-center">
          <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
            {form.type === "Warehouse" ? (
              <Warehouse className="text-blue-600" />
            ) : (
              <Factory className="text-blue-600" />
            )}{" "}
            {form.name}{" "}
            {isReadOnly && (
              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded border border-amber-200">
                View Only
              </span>
            )}
          </h3>
          <button onClick={onClose}>
            <X size={20} className="text-slate-400 hover:text-red-500" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-blue-800 uppercase">
              Thông Tin Hợp Đồng
            </h4>
            <div>
              <label className="block text-xs font-bold text-slate-600">
                Khách Thuê
              </label>
              <input
                disabled={isReadOnly}
                type="text"
                name="tenant"
                value={form.tenant}
                onChange={handleChange}
                className="w-full p-2 border rounded disabled:bg-slate-100"
              />
            </div>
            {/* --- KHÔI PHỤC Ô CHỌN NGÀNH HÀNG --- */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Ngành Hàng (Industry)
              </label>
              {isCustomIndustry ? (
                // Ô nhập tay (khi bấm nút thêm mới)
                <input
                  disabled={isReadOnly}
                  type="text"
                  name="industry"
                  placeholder="Nhập ngành hàng mới..."
                  value={form.industry || ""}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-blue-400 bg-blue-50 rounded-lg text-sm font-bold text-blue-800 focus:ring-2 focus:ring-blue-500 outline-none"
                  autoFocus
                />
              ) : (
                // Ô chọn danh sách (mặc định)
                <select
                  disabled={isReadOnly}
                  name="industry"
                  value={form.industry || ""}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-sm cursor-pointer focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-slate-100"
                >
                  <option value="">-- Chọn ngành --</option>
                  {INDUSTRIES.map((ind) => (
                    <option key={ind} value={ind}>
                      {ind}
                    </option>
                  ))}
                </select>
              )}

              {/* Nút chuyển đổi giữa Chọn và Nhập */}
              {!isReadOnly && (
                <button
                  onClick={() => setIsCustomIndustry(!isCustomIndustry)}
                  className="text-xs font-bold text-blue-600 mt-1.5 hover:underline flex items-center gap-1"
                >
                  {isCustomIndustry
                    ? "↩ Quay lại danh sách"
                    : "+ Thêm ngành mới"}
                </button>
              )}
            </div>
            {/* ----------------------------------- */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-600">
                  Giá ($/m2)
                </label>
                <input
                  disabled={isReadOnly}
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full p-2 border rounded disabled:bg-slate-100"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600">
                  Trạng Thái
                </label>
                <select
                  disabled={isReadOnly}
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full p-2 border rounded disabled:bg-slate-100"
                >
                  <option value="vacant">Trống</option>
                  <option value="occupied">Đang thuê</option>
                  <option value="maintenance">Bảo trì</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600">
                Hết Hạn HĐ
              </label>
              <input
                disabled={isReadOnly}
                type="date"
                name="expiry"
                value={form.expiry || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded disabled:bg-slate-100"
              />
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-800 uppercase">
              Thông Số Kỹ Thuật
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-600">
                  Trần
                </label>
                <input
                  disabled={isReadOnly}
                  name="height"
                  value={form.tech.height}
                  className="w-full p-2 border rounded disabled:bg-slate-100"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600">
                  Sàn
                </label>
                <input
                  disabled={isReadOnly}
                  name="floor"
                  value={form.tech.floor}
                  className="w-full p-2 border rounded disabled:bg-slate-100"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600">
                  Điện
                </label>
                <input
                  disabled={isReadOnly}
                  name="power"
                  value={form.tech.power}
                  className="w-full p-2 border rounded disabled:bg-slate-100"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600">
                  PCCC
                </label>
                <input
                  disabled={isReadOnly}
                  name="pccc"
                  value={form.tech.pccc}
                  className="w-full p-2 border rounded disabled:bg-slate-100"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-red-600">
                Ghi Chú Sự Cố
              </label>
              <textarea
                disabled={isReadOnly}
                name="issue"
                value={form.issue || ""}
                onChange={handleChange}
                className="w-full p-2 border border-red-200 bg-red-50 rounded text-sm h-20 disabled:bg-slate-100"
                placeholder="Nhập sự cố..."
              ></textarea>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 bg-slate-50 border-t flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded text-slate-600 hover:bg-slate-200"
          >
            {isReadOnly ? "Đóng" : "Hủy"}
          </button>
          {!isReadOnly && (
            <button
              onClick={() => onSave(form)}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Lưu Thay Đổi
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const WelcomeModal = ({ onComplete }) => {
  const [mode, setMode] = useState("selection");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 1. Lấy ảnh từ LocalStorage
  const savedAvatar = localStorage.getItem("user_avatar");

  const handleLogin = () => {
    if (password === "123") onComplete(true);
    else setError("Mật khẩu không đúng!");
  };

  return (
    <div className="fixed inset-0 bg-slate-900/80 flex items-center justify-center z-[60] p-4 animate-in fade-in backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden border border-slate-200">
        {/* --- HEADER (SỬA Ở ĐÂY: Hiện ảnh Avatar to ở giữa) --- */}
        <div className="bg-slate-900 pt-10 pb-8 px-8 text-center text-white relative overflow-hidden flex flex-col items-center">
          {/* Trang trí nền mờ (giữ nguyên) */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 pointer-events-none"></div>

          {/* --- KHUNG ẢNH AVATAR --- */}
          <div className="w-24 h-24 rounded-full border-4 border-white/20 shadow-2xl overflow-hidden mb-4 relative z-10 bg-slate-800 flex items-center justify-center group">
            {savedAvatar ? (
              <img
                src={savedAvatar}
                alt="Logo"
                className="w-full h-full object-cover"
              />
            ) : (
              // Nếu chưa có ảnh thì hiện icon Nhà Xưởng mặc định
              <Warehouse size={40} className="text-blue-500" />
            )}

            {/* Hiệu ứng bóng sáng khi có ảnh */}
            <div className="absolute inset-0 rounded-full ring-1 ring-white/30"></div>
          </div>

          {/* Dòng chữ BW INDUSTRIAL */}
          <h2 className="text-2xl font-bold relative z-10 tracking-tight">
            BW INDUSTRIAL
          </h2>
          <p className="text-sm opacity-70 relative z-10 mt-1">
            Hệ thống Quản lý Bất động sản Công nghiệp
          </p>
        </div>

        {/* --- PHẦN NÚT BẤM BÊN DƯỚI (GIỮ NGUYÊN) --- */}
        <div className="p-8">
          {mode === "selection" ? (
            <div className="space-y-4">
              {/* Nút Guest */}
              <button
                onClick={() => onComplete(false)}
                className="w-full p-4 border rounded-xl hover:border-blue-500 hover:bg-blue-50 flex items-center gap-4 transition-all group"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full group-hover:scale-110 transition-transform">
                  <Eye size={24} />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-slate-800">Khách (Guest)</h4>
                  <p className="text-xs text-slate-500">Chỉ xem & đánh giá</p>
                </div>
              </button>

              {/* Nút Admin */}
              <button
                onClick={() => setMode("admin")}
                className="w-full p-4 border rounded-xl hover:border-amber-500 hover:bg-amber-50 flex items-center gap-4 transition-all group"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-amber-100 text-amber-600 rounded-full group-hover:scale-110 transition-transform">
                  <Lock size={24} />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-slate-800">Quản Trị Viên</h4>
                  <p className="text-xs text-slate-500">
                    Quyền chỉnh sửa toàn bộ
                  </p>
                </div>
              </button>
            </div>
          ) : (
            // Form Nhập Password
            <div className="space-y-4 animate-in slide-in-from-right">
              <button
                onClick={() => {
                  setMode("selection");
                  setError("");
                }}
                className="text-xs text-slate-500 hover:text-blue-600 flex items-center gap-1"
              >
                ← Quay lại
              </button>
              <div>
                <label className="block text-xs font-bold mb-1 text-slate-700">
                  MẬT KHẨU (Gợi ý: bwnt2)
                </label>
                <input
                  type="password"
                  autoFocus
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-slate-800"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                />
                {error && (
                  <p className="text-red-500 text-xs mt-2 font-bold">{error}</p>
                )}
              </div>
              <button
                onClick={handleLogin}
                className="w-full py-3 bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-700 shadow-lg shadow-amber-500/30 transition-all"
              >
                XÁC NHẬN
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
// --- CUSTOM HOOK: QUẢN LÝ DỮ LIỆU BỀN VỮNG ---
// Hàm này đảm bảo đọc dữ liệu ngay lập tức và đồng bộ giữa các Tab
function useLocalStorage(key, initialValue) {
  // 1. Khởi tạo state bằng cách ĐỌC NGAY LẬP TỨC từ LocalStorage
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      // Nếu có dữ liệu trong kho -> Dùng nó. Nếu không -> Dùng giá trị mặc định
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  // 2. Hàm thay thế cho setValue để vừa cập nhật State, vừa lưu LocalStorage
  const setValue = (value) => {
    try {
      // Cho phép value là một hàm (giống useState chuẩn)
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      // Lưu vào State React
      setStoredValue(valueToStore);

      // Lưu vào LocalStorage trình duyệt ngay lập tức
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));

        // Gửi sự kiện để các Tab khác cùng cập nhật (nếu đang mở nhiều tab)
        window.dispatchEvent(new Event("storage"));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
export default function App() {
  // --- 1. TỰ ĐỘNG LƯU: ẢNH DỰ ÁN ---
  const [projectImg, setProjectImg] = useState(
    () =>
      localStorage.getItem("bw_project_img") ||
      "https://images.unsplash.com/photo-1565610261705-7c1653c8e46d?q=80&w=2070"
  );

  // --- 2. TỰ ĐỘNG LƯU: AVATAR ---
  const [avatar, setAvatar] = useState(
    () => localStorage.getItem("user_avatar") || null
  );

  // --- 3. TỰ ĐỘNG LƯU: TRẠNG THÁI ĐĂNG NHẬP (Code Mới) ---
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const saved = localStorage.getItem("app_isLoggedIn");
    return saved ? JSON.parse(saved) : false;
  });

  // --- 4. TỰ ĐỘNG LƯU: DARK MODE (Code Mới) ---
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("app_darkMode");
    return saved ? JSON.parse(saved) : false;
  });
 
  // --- 5. EFFECTS: LẮNG NGHE ĐỂ LƯU (Code Mới) ---
  // Lưu đăng nhập
  useEffect(() => {
    localStorage.setItem("app_isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  // Lưu và áp dụng Dark Mode
  useEffect(() => {
    localStorage.setItem("app_darkMode", JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // --- CÁC HÀM XỬ LÝ SỰ KIỆN (UPLOAD ẢNH) ---
  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        // Giới hạn 2MB
        alert("Ảnh quá lớn! Vui lòng chọn ảnh dưới 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
        localStorage.setItem("user_avatar", reader.result); // Lưu vĩnh viễn
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadProjectImg = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        // Giới hạn 1MB
        alert("Ảnh quá lớn! Vui lòng chọn ảnh dưới 1MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProjectImg(reader.result);
        localStorage.setItem("bw_project_img", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // --- LOAD TAILWIND (Giữ nguyên) ---
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.tailwindcss.com";
    script.async = true;
    document.head.appendChild(script);
    // Cấu hình tailwind để hỗ trợ dark mode
    script.onload = () => {
      window.tailwind.config = {
        darkMode: "class",
        theme: { extend: {} },
      };
    };
  }, []);

  // --- CÁC STATE CŨ CỦA BẠN (Giữ nguyên phần còn lại) ---
 // --- STATE MỚI (Dùng Supabase) ---
 const [units, setUnits] = useState([]);
 const [maintenanceTickets, setMaintenanceTickets] = useState([]);

 // --- TẢI DỮ LIỆU TỪ SUPABASE KHI MỞ WEB ---
 useEffect(() => {
   const fetchData = async () => {
     // 1. Tải Sơ đồ kho (Units)
     const { data: uData, error: uError } = await supabase.from('units').select('*');
     if (uData && uData.length > 0) {
       setUnits(uData);
     } else {
       setUnits(initialData); // Nếu DB trống thì dùng dữ liệu mẫu
     }

     // 2. Tải Phiếu bảo trì
     const { data: mData, error: mError } = await supabase.from('maintenance_tickets').select('*');
     if (mData) {
       // Map lại tên cột từ SQL (snake_case) sang React (camelCase) cho khớp code cũ
       const formatted = mData.map(t => ({
         ...t,
         unitId: t.unit_id,
         subCategory: t.sub_category,
         desc: t.desc_content
       }));
       setMaintenanceTickets(formatted);
     }
   };

   fetchData();
 }, []);

  const [selectedUnit, setSelectedUnit] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  // Ẩn Welcome nếu đã đăng nhập
  const [showWelcome, setShowWelcome] = useState(!isLoggedIn);

  const [currentView, setCurrentView] = useState("dashboard");
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // ... (Giữ nguyên phần metrics, industryStats, CHART_COLORS, handleSaveFactory ...)

  const metrics = useMemo(() => {
    const totalArea = units.reduce((sum, u) => sum + u.area, 0);

    const occupiedArea = units
      .filter((u) => u.status === "occupied")
      .reduce((sum, u) => sum + u.area, 0);

    // FIX LỖI DOANH THU: Thêm parseFloat để chuyển "4.5" thành số 4.5 trước khi nhân
    const revenue = units
      .filter((u) => u.status === "occupied")
      .reduce((sum, u) => sum + u.area * (parseFloat(u.price) || 0), 0);

    // FIX LỖI BẢO TRÌ: Đếm từ dữ liệu maintenanceTickets thực tế thay vì đếm từ master plan
    // Lưu ý: Bạn cần khai báo maintenanceTickets ở Bước 2, tạm thời code này sẽ chờ bước 2
    const activeIssues = (
      typeof maintenanceTickets !== "undefined" ? maintenanceTickets : []
    ).filter((t) => t.status !== "completed").length;

    return {
      totalArea,
      occupiedArea,
      revenue,
      issues: activeIssues,
      occupancyRate:
        totalArea > 0 ? Math.round((occupiedArea / totalArea) * 100) : 0,
    };
  }, [units]); // Sau này sẽ thêm maintenanceTickets vào dependency
  // --- BƯỚC 1: TÍNH TOÁN SỐ LIỆU NGÀNH HÀNG (ĐANG THIẾU) ---
  const industryStats = useMemo(() => {
    const stats = {};
    units.forEach((u) => {
      // Chỉ tính các ô ĐANG THUÊ (occupied) và CÓ ngành (industry)
      if (u.status === "occupied" && u.industry) {
        stats[u.industry] = (stats[u.industry] || 0) + u.area;
      }
    });

    // Chuyển object thành mảng để vẽ biểu đồ
    return Object.keys(stats)
      .map((key) => ({
        name: key,
        value: stats[key],
      }))
      .sort((a, b) => b.value - a.value); // Sắp xếp từ lớn đến bé
  }, [units]);

  // --- BƯỚC 2: ĐỊNH NGHĨA BẢNG MÀU ---
  const CHART_COLORS = [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#ec4899",
  ];
  // -----------------------------------
  const handleSaveFactory = (updated) => {
    setUnits((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    setShowEditModal(false);
    setSelectedUnit(null);
  };
  const handleWelcomeComplete = (status) => {
    setIsLoggedIn(status);
    setShowWelcome(false);
  };

  const filteredUnits = units.filter(
    (u) =>
      (filter === "all" || u.status === filter) &&
      u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex">
      <aside className="w-20 lg:w-64 bg-slate-900 text-white hidden md:flex flex-col fixed h-full z-20">
        <div className="h-16 flex items-center px-6 border-b border-slate-800 gap-2">
          <Warehouse className="text-blue-500" />
          <span className="font-bold">BW DASHBOARD</span>
        </div>
        <nav className="p-3 space-y-1">
          {[
            { id: "dashboard", icon: LayoutDashboard, label: "Tổng Quan" },
            { id: "maintenance", icon: Wrench, label: "Quản Lý Bảo Trì" },
            { id: "support", icon: LifeBuoy, label: "Hỗ Trợ Khách Hàng" },
            { id: "utility", icon: Zap, label: "Quản Lý Điện & Nước" },
            { id: "fuel", icon: Fuel, label: "Quản Lý Nhiên Liệu" },
            { id: "customers", icon: Users, label: "Khách Hàng" },
            { id: "contracts", icon: FileText, label: "Hợp Đồng" },
          ].map((i) => (
            <button
              key={i.id}
              onClick={() => setCurrentView(i.id)}
              className={`w-full flex items-center p-3 rounded-lg gap-3 ${
                currentView === i.id ? "bg-blue-600" : "hover:bg-slate-800"
              }`}
            >
              <i.icon size={20} /> {i.label}
            </button>
          ))}
        </nav>
      </aside>
      <main className="flex-1 md:ml-64 flex flex-col h-screen overflow-hidden bg-slate-50/50">
        <header className="h-16 bg-white dark:bg-slate-900 border-b dark:border-slate-800 flex items-center justify-between px-6 sticky top-0 shadow-sm z-10 transition-colors">
          <div className="flex items-center gap-4">
            <h2 className="font-bold text-xl hidden md:block dark:text-white">
              {currentView === "dashboard"
                ? "Dashboard Tổng Quan"
                : currentView === "maintenance"
                ? "Quản Lý Bảo Trì"
                : currentView === "support"
                ? "Hỗ Trợ Khách Hàng"
                : currentView === "utility"
                ? "Quản Lý Điện & Nước"
                : currentView === "fuel"
                ? "Quản Lý Nhiên Liệu"
                : "Quản Lý"}
            </h2>
            {currentView === "dashboard" && (
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 dark:text-white rounded-full text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                  placeholder="Tìm kiếm..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* 1. NÚT DARK MODE */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-yellow-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title="Giao diện Sáng/Tối"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* 2. NÚT ĐĂNG NHẬP/THOÁT */}
            {!isLoggedIn ? (
              <button
                onClick={() => setShowWelcome(true)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-xs font-bold hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
              >
                <Eye size={14} /> Đăng nhập
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="hidden md:inline px-3 py-1 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-full border border-amber-200">
                  ADMIN
                </span>
                <button
                  onClick={() => {
                    setIsLoggedIn(false);
                    setShowWelcome(true);
                  }}
                  className="flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-full text-red-500 text-xs font-bold hover:bg-red-50 dark:bg-slate-800 dark:hover:bg-slate-700"
                >
                  <LogIn size={14} /> Thoát
                </button>
              </div>
            )}

            {/* 3. AVATAR (Có chức năng upload) */}
            <label className="cursor-pointer relative group">
              <div className="h-9 w-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs overflow-hidden border-2 border-white dark:border-slate-800 shadow-sm">
                {avatar ? (
                  <img
                    src={avatar}
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                ) : isLoggedIn ? (
                  "AD"
                ) : (
                  "G"
                )}
              </div>

              {/* Chỉ cho phép upload khi đã đăng nhập */}
              {isLoggedIn && (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                  />
                  <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera size={14} className="text-white" />
                  </div>
                </>
              )}
            </label>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-8 custom-scrollbar">
          {currentView === "dashboard" ? (
            <>
              {/* 1. HÀNG TRÊN CÙNG: 4 Ô SỐ LIỆU (STAT CARDS - GRADIENT CYAN) */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard
                  title="Doanh Thu Dự Kiến"
                  value={`$${(metrics.revenue / 1000).toFixed(1)}k`}
                  subtext="Tháng hiện tại"
                  icon={DollarSign}
                  trend={12.5}
                />
                <StatCard
                  title="Tỷ Lệ Lấp Đầy"
                  value={`${metrics.occupancyRate}%`}
                  subtext={`${(metrics.occupiedArea / 1000).toFixed(1)}k m²`}
                  icon={CheckCircle}
                  trend={5.2}
                />
                <StatCard
                  title="Hợp Đồng Sắp Hết Hạn"
                  value="12"
                  subtext="Trong 6 tháng tới"
                  icon={Calendar}
                  trend={-2.1}
                />
                <StatCard
                  title="Cần Bảo Trì"
                  value={metrics.issues}
                  subtext="Yêu cầu xử lý gấp"
                  icon={AlertTriangle}
                />
              </div>

              {/* 2. HÀNG GIỮA: THÔNG TIN DỰ ÁN & BIỂU ĐỒ (ĐỒNG BỘ CAO BẰNG NHAU) */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                {/* --- CỘT TRÁI: THÔNG TIN DỰ ÁN (CHI TIẾT MỚI) --- */}
                <div className="lg:col-span-2 flex flex-col h-full">
                  <div
                    className={`h-full flex flex-col md:flex-row rounded-2xl border-2 overflow-hidden shadow-2xl bg-[#0f2950] border-[#00aeee]`}
                  >
                    {/* CỘT TRÁI: HÌNH ẢNH DỰ ÁN */}
                    <div className="relative w-full md:w-1/3 h-64 md:h-auto overflow-hidden border-r-0 md:border-r border-[#00aeee]/30 group/img">
                      <img
                        src={projectImg}
                        alt="BW Nhon Trach 2"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 hover:opacity-100"
                      />

                      {/* Nút đổi ảnh (Chỉ hiện khi rê chuột & đã đăng nhập) */}
                      {isLoggedIn && (
                        <label className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity cursor-pointer z-20">
                          <div className="flex flex-col items-center text-white">
                            <Camera size={32} className="mb-2 text-[#00aeee]" />
                            <span className="text-xs font-bold uppercase">
                              Đổi ảnh (Max 500KB)
                            </span>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleUploadProjectImg}
                          />
                        </label>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f2950] via-[#0f2950]/60 to-transparent flex flex-col justify-end p-6 pointer-events-none">
                        <span className="text-[10px] font-bold bg-[#00aeee] text-white w-fit px-2 py-1 rounded uppercase tracking-wider mb-2 shadow-lg">
                          Dự án trọng điểm
                        </span>
                        <h3 className="text-2xl font-extrabold text-white leading-tight">
                          BW NHƠN TRẠCH 2
                        </h3>
                        <p className="text-[#00aeee] text-xs mt-1 font-bold uppercase tracking-widest">
                          Lộc Khang Industrial Hub
                        </p>
                      </div>
                    </div>

                    {/* Thông tin chi tiết (Chữ to + Icon) */}
                    <div className="flex-1 p-5 flex flex-col gap-6 relative z-10 justify-between">
                      <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>

                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Tiêu chuẩn */}
                        <div>
                          <h4 className="text-sm font-extrabold text-[#00aeee] uppercase mb-3 flex items-center gap-2 border-b border-[#00aeee]/30 pb-2">
                            <Factory size={18} /> Tiêu chuẩn kỹ thuật
                          </h4>
                          <div className="grid grid-cols-2 gap-3">
                            {[
                              {
                                label: "Trần cao",
                                val: "9m",
                                icon: (
                                  <ArrowUpRight
                                    size={20}
                                    className="text-emerald-400"
                                  />
                                ),
                              },
                              {
                                label: "Tải sàn",
                                val: "3 tấn",
                                icon: (
                                  <LayoutDashboard
                                    size={20}
                                    className="text-amber-400"
                                  />
                                ),
                              },
                              {
                                label: "PCCC",
                                val: "Sprinkler",
                                icon: (
                                  <Lightbulb
                                    size={20}
                                    className="text-rose-400"
                                  />
                                ),
                              },
                              {
                                label: "Điện",
                                val: "400 kVA",
                                icon: (
                                  <Zap size={20} className="text-yellow-400" />
                                ),
                              },
                            ].map((item, idx) => (
                              <div
                                key={idx}
                                className="bg-[#1a3c6e]/50 p-2 rounded-xl border border-white/5 hover:border-[#00aeee]/50 transition-colors"
                              >
                                <div className="flex justify-between items-start mb-1">
                                  <span className="text-[10px] text-gray-400">
                                    {item.label}
                                  </span>
                                  {item.icon}
                                </div>
                                <div className="text-lg font-bold text-white">
                                  {item.val}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Vị trí */}
                        <div>
                          <h4 className="text-sm font-extrabold text-[#00aeee] uppercase mb-3 flex items-center gap-2 border-b border-[#00aeee]/30 pb-2">
                            <Map size={18} /> Vị trí chiến lược
                          </h4>
                          <div className="space-y-2">
                            {[
                              {
                                name: "Sân bay Long Thành",
                                dist: "18 km",
                                time: "30p",
                              },
                              {
                                name: "Cảng Cát Lái",
                                dist: "30 km",
                                time: "45p",
                              },
                              {
                                name: "Trung tâm TP.HCM",
                                dist: "40 km",
                                time: "60p",
                              },
                              {
                                name: "Cảng Cái Mép",
                                dist: "40 km",
                                time: "60p",
                              },
                            ].map((i, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-transparent hover:border-[#00aeee]/30 transition-all"
                              >
                                <div>
                                  <div className="text-xs font-bold text-gray-200">
                                    {i.name}
                                  </div>
                                  <div className="text-[10px] text-gray-400">
                                    {i.dist}
                                  </div>
                                </div>
                                <span className="text-base font-extrabold text-[#00aeee]">
                                  {i.time}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Giá & Nút bấm */}
                      <div className="bg-gradient-to-r from-[#1a3c6e] to-[#0f2950] p-4 rounded-xl border border-[#00aeee]/30 flex flex-wrap justify-between items-center gap-4 mt-auto shadow-lg">
                        <div>
                          <div className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-1">
                            Giá thuê tham khảo
                          </div>
                          <div className="text-2xl font-extrabold text-white tracking-tight">
                            $4.7 <span className="text-[#00aeee]">-</span> $5.4
                            <span className="text-xs font-medium text-gray-400 ml-1">
                              /m²/tháng
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            window.open(
                              "https://bwindustrial.com/vi/property/bw-nhon-trach-2-loc-khang-industrial-hub/",
                              "_blank"
                            )
                          }
                          className="px-5 py-3 bg-[#00aeee] hover:bg-[#0095cc] text-white font-bold rounded-lg text-xs flex items-center gap-2 transition-all hover:-translate-y-0.5 shadow-lg shadow-cyan-500/20 uppercase"
                        >
                          <ExternalLink size={16} /> Xem chi tiết dự án
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* --- CỘT PHẢI: BIỂU ĐỒ CƠ CẤU (ĐỒNG BỘ) --- */}
                <div className="flex flex-col h-full">
                  <div
                    className={`h-full p-0 rounded-2xl border-2 shadow-2xl flex flex-col relative overflow-hidden bg-[#0f2950] border-[#00aeee]`}
                  >
                    <div className="p-4 border-b border-[#00aeee]/20 z-10 bg-[#0f2950]/50 backdrop-blur-sm">
                      <h3 className="font-extrabold text-lg text-white flex items-center gap-2">
                        <PieIcon size={20} className="text-[#00aeee]" />
                        Cơ Cấu Khách Thuê
                      </h3>
                    </div>
                    <div className="flex-1 p-2 flex flex-col justify-center items-center relative z-10">
                      <div className="w-full flex-1 min-h-[160px] relative">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={
                                industryStats.length > 0
                                  ? industryStats
                                  : [{ name: "Trống", value: 1 }]
                              }
                              cx="50%"
                              cy="50%"
                              innerRadius="60%"
                              outerRadius="80%"
                              paddingAngle={4}
                              dataKey="value"
                              stroke="none"
                            >
                              {industryStats.length > 0 ? (
                                industryStats.map((entry, index) => (
                                  <Cell
                                    key={`cell-${index}`}
                                    fill={
                                      CHART_COLORS[index % CHART_COLORS.length]
                                    }
                                  />
                                ))
                              ) : (
                                <Cell fill="#334155" />
                              )}
                            </Pie>
                            <RechartsTooltip
                              formatter={(value) =>
                                `${value.toLocaleString()} m²`
                              }
                              contentStyle={{ borderRadius: "8px" }}
                              cursor={false}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                        {industryStats.length > 0 && (
                          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-slate-400 text-[10px] uppercase font-bold">
                              Tổng
                            </span>
                            <span className="text-white text-xl font-extrabold">
                              {(metrics.occupiedArea / 1000).toFixed(1)}k
                            </span>
                            <span className="text-[#00aeee] text-[10px]">
                              m²
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="w-full px-4 pb-4 mt-2 grid grid-cols-2 gap-2">
                        {industryStats.slice(0, 6).map((entry, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between text-xs border-b border-white/5 pb-1 last:border-0"
                          >
                            <div className="flex items-center gap-1.5 overflow-hidden">
                              <div
                                className="w-2 h-2 rounded-full shrink-0"
                                style={{
                                  backgroundColor:
                                    CHART_COLORS[index % CHART_COLORS.length],
                                }}
                              ></div>
                              <span className="text-slate-300 truncate max-w-[80px]">
                                {entry.name}
                              </span>
                            </div>
                            <span className="font-bold text-white">
                              {(
                                (entry.value / metrics.occupiedArea) *
                                100
                              ).toFixed(0)}
                              %
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#00aeee]/10 rounded-full blur-3xl pointer-events-none"></div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-lg">
                    Sơ Đồ Mặt Bằng (Master Plan)
                  </h3>
                  <div className="flex gap-2">
                    {["all", "occupied", "vacant", "maintenance"].map((f) => (
                      <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-3 py-1 rounded-md text-xs font-bold capitalize ${
                          filter === f
                            ? "bg-blue-100 text-blue-700"
                            : "text-slate-500 hover:bg-slate-100"
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
                <ZoneMap
                  units={filteredUnits}
                  zoneName="A"
                  onSelect={(u) => {
                    setSelectedUnit(u);
                    setShowEditModal(true);
                  }}
                  isReadOnly={!isLoggedIn}
                />
                <div className="border-t my-6"></div>
                <ZoneMap
                  units={filteredUnits}
                  zoneName="B"
                  onSelect={(u) => {
                    setSelectedUnit(u);
                    setShowEditModal(true);
                  }}
                  isReadOnly={!isLoggedIn}
                />
                <div className="border-t my-6"></div>
                <ZoneMap
                  units={filteredUnits}
                  zoneName="C"
                  onSelect={(u) => {
                    setSelectedUnit(u);
                    setShowEditModal(true);
                  }}
                  isReadOnly={!isLoggedIn}
                />
              </div>
            </>
          ) : currentView === "maintenance" ? (
            <MaintenancePanel
              isLoggedIn={isLoggedIn}
              tickets={maintenanceTickets} // Truyền dữ liệu vào
              setTickets={setMaintenanceTickets} // Truyền hàm sửa dữ liệu vào
            />
          ) : currentView === "support" ? (
            <SupportPanel isLoggedIn={isLoggedIn} />
          ) : currentView === "utility" ? (
            <UtilityPanel isLoggedIn={isLoggedIn} />
          ) : currentView === "fuel" ? (
            <FuelManagementPanel isLoggedIn={isLoggedIn} />
          ) : (
            <div className="flex h-full items-center justify-center text-slate-400">
              Module đang cập nhật...
            </div>
          )}
        </div>
      </main>
      {showWelcome && <WelcomeModal onComplete={handleWelcomeComplete} />}
      {showEditModal && selectedUnit && (
        <EditModal
          unit={selectedUnit}
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveFactory}
          isReadOnly={!isLoggedIn}
        />
      )}
    </div>
  );
}
