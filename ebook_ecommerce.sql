-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 30, 2025 at 04:29 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ebook_ecommerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `authors`
--

CREATE TABLE `authors` (
  `id` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `img` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `authors`
--

INSERT INTO `authors` (`id`, `name`, `description`, `img`) VALUES
('2fdd7168-4de0-11e3-917b-7827e075dfdc', 'Paulo Coelho', 'Paulo Coelho là tiểu thuyết gia nổi tiếng người Brasil.', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.chungta.com%2Fnd%2Ftu-lieu-tra-cuu%2F12-cuon-sach-hay-cua-paulo-coelho.html&psig=AOvVaw1wC_y4Vp61MwNT6BQDUEVz&ust=1708076855919000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCIDkmL6IrYQDFQAAAAAdAAAAABAE'),
('6a5bf1bd-f8b2-1161-9091-2af13324d0e2', 'Dale Carnegie', 'Dale Breckenridge Carnegie là một nhà văn và nhà thuyết trình Mỹ và là người phát triển các lớp tự giáo dục, nghệ thuật bán hàng, huấn luyện đoàn thể, nói trước công chúng và các kỹ năng giao tiếp giữa mọi người.', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.casadellibro.com%2Febook-dale-carnegie-ebook%2F9788504021103%2F11507487&psig=AOvVaw1xs6PW0CRDrHmH1371GRq3&ust=1708076738567000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCIji4POHrYQDFQAAAAAdAAAAABAK'),
('87ce590c-e553-114f-92ec-069711a8dd7e', 'Rosie Nguyễn', 'Rosie Nguyễn, tên thật là Nguyễn Hoàng Nguyên, tác giả quyển sách Ta ba lô trên đất Á. Hiện cô đang làm công việc viết tự do. Bên cạnh việc viết sách, viết báo, Rosie Nguyễn còn là giám đốc dự án một chương trình phượt dành cho giới trẻ do UNESCO chủ trì', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fdulich.thethaovanhoa.vn%2Fdulich%2Fthe-gioi-ben-trong-minh-tren-hanh-trinh-tu-hoc-cua-rosie-nguyen-n20210911135948354.htm&psig=AOvVaw1302n5BR-LG4sfNbech369&ust=1707822745463000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCIi2udLVpYQDFQAAAAAdAAAAABAE'),
('b8a9fd86-7bf4-1132-8c83-57662ccc2dbf', 'Gari', 'Nguyễn Thị Yến Phượng không xa lạ với độc giả trẻ Việt Nam. Cô gái tốt nghiệp Trường ĐH Khoa học xã hội và nhân văn TP.HCM, lấy bút danh Gari Nguyễn với hy vọng mình luôn là một chiến binh nhỏ bé, mạnh mẽ vượt qua những thách thức của cuộc sống.', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.facebook.com%2Ftacgiagari%2Fphotos%2Fa.867220393313542%2F3246371228731768%2F%3Ftype%3D3&psig=AOvVaw232yfXiChS3Wka990VKyFW&ust=1708078606442000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPCD8OSOrYQDFQAAAAAdAAAAABAE'),
('bc0677d5-95aa-118f-9873-f0c99f314e1d', 'Vũ Trọng Phụng', 'Vũ Trọng Phụng là một nhà văn, nhà báo nổi tiếng của Việt Nam vào đầu thế kỷ 20.', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fvovworld.vn%2Fvi-VN%2Ftap-chi-van-nghe%2Fnhin-lai-di-san-van-hoc-vu-trong-phung-710517.vov&psig=AOvVaw1fBoPugNlfg82otJRJMhL2&ust=1708078356584000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKDEooaOrYQDFQAAAAAdAAAAABAI'),
('d5c9ac02-ecfe-111b-8324-fd32631234c2', 'Nam Cao', 'Nam Cao là một nhà văn, nhà thơ, nhà báo và cũng là một chiến sĩ, liệt sỹ người Việt Nam. Ông là nhà văn hiện thực lớn, một nhà báo kháng chiến, một trong những nhà văn tiêu biểu nhất thế kỷ 20.', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fmientay.giadinhonline.vn%2Fnhung-tac-pham-noi-tieng-cua-nha-van-nam-cao-d4947.html&psig=AOvVaw0Qbgdf4WZ8UCA7od5AAmWd&ust=1708078211004000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJiJiq-NrYQDFQAAAAAdAAAAABAK');

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` varchar(50) NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `image` text DEFAULT NULL,
  `pdf_url` text DEFAULT NULL,
  `author_ID` varchar(50) DEFAULT NULL,
  `category_ID` varchar(50) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `title`, `description`, `image`, `pdf_url`, `author_ID`, `category_ID`, `price`, `created_at`, `modified_at`, `deleted_at`) VALUES
('0e5ddd79-cf37-119f-b954-f275088ab371', 'Hẹn Nhau Ở Một Cuộc Đời Khác', NULL, NULL, NULL, NULL, NULL, 20000, '2024-02-15 10:34:14', NULL, NULL),
('193d2ae9-c764-1181-be6c-a69b33ef1612', 'Đắc Nhân Tâm', NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-15 10:29:38', NULL, NULL),
('463d18ee-1844-113b-9b75-6192e19de744', 'Lão Hạc', NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-15 10:32:21', NULL, NULL),
('60d83f89-16e9-116f-bf32-9551d3710e71', 'Kinh tế Việt Nam: Thăng trầm và Đột phá', NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-15 10:26:43', NULL, NULL),
('73a926cf-b77c-1113-9d1c-043aa0adcea4', 'Số đỏ', NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-15 10:31:45', NULL, NULL),
('753064a0-631c-1111-8189-5a1a4bdb5932', 'Nhà Giả Kim', NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-15 10:30:10', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `id` varchar(50) NOT NULL,
  `session_ID` varchar(50) NOT NULL,
  `book_ID` varchar(50) NOT NULL,
  `checked` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categorys`
--

CREATE TABLE `categorys` (
  `id` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categorys`
--

INSERT INTO `categorys` (`id`, `name`, `description`) VALUES
('3aad7e08-e786-11e9-81a3-627615f882a2', 'Self-help', 'Sách tự lực là sách được viết với mục đích hướng dẫn độc giả giải quyết những vấn đề cá nhân. Dòng sách lấy tên từ Self-Help, cuốn sách bán chạy nhất năm 1859 của Samuel Smiles, nhưng còn được biết đến và phân loại theo \"tự cải thiện\", một thuật ngữ bản hiện đại hóa của tự lực.'),
('3d77ec60-7d1a-110d-8e65-2d11c8ce55b3', 'Tiểu thuyết', 'Tiểu thuyết là một thể loại văn xuôi có hư cấu, thông qua nhân vật, hoàn cảnh, sự việc để phản ánh bức tranh xã hội rộng lớn và những vấn đề của cuộc sống con người, biểu hiện tính chất tường thuật, tính chất kể chuyện bằng ngôn ngữ văn xuôi theo những chủ đề xác định.'),
('92b8a61e-9003-111f-a35a-aa5d2a36f9f9', 'Sách kinh tế', 'Sách kinh tế là các nghiên cứu, hoặc hướng dẫn liên quan đến lĩnh vực kinh tế. Các sách kinh tế có thể chứa các nội dung như lý thuyết kinh tế, phân tích thị trường, quản lý tài chính, kế toán, quản lý doanh nghiệp, chính sách kinh tế, và nhiều chủ đề khác liên quan đến hoạt động kinh tế trong xã hội.'),
('9ca5b0c3-89ef-11d2-8b77-3cd62ea404fe', 'Sách thiếu nhi', '\r\nSách thiếu nhi là các tác phẩm văn học được viết dành riêng cho độc giả trẻ em. Những cuốn sách này thường có nội dung, hình ảnh và ngôn ngữ phù hợp với lứa tuổi của độc giả nhỏ tuổi, giúp họ hiểu và tiếp cận với thế giới xung quanh một cách thú vị và dễ dàng hơn. Sách thiếu nhi có thể bao gồm nhiều thể loại và chủ đề khác nhau, từ truyện cổ tích, truyện tranh, truyện hài hước, truyện phiêu lưu đến sách giáo dục, sách học tiếng, sách học số, và nhiều nội dung khác nhau như kỹ năng sống, giá trị nhân văn, và học hỏi về thế giới xã hội, tự nhiên và văn hóa.'),
('b8a6b3d5-8359-116a-8583-0b4f0e4add32', 'Ngôn tình', 'Ngôn tình là thể loại truyện, tiểu thuyết viết về câu chuyện tình yêu, những câu chuyện xoay quanh cuộc sống vợ chồng, những mối tình rắc rối, hoặc là cuộc tình bị ép duyên, mối quan hệ đồng tính nam/nữ… bay bổng và có phần nào đó xa rời thực tế. Ngôn tình hiện đại được khá nhiều người quan tâm không như tiểu thuyết ngôn tình cổ điển vì mọi người cho rằng truyện không có kết cấu rõ ràng không có sức thu hút người đọc.');

-- --------------------------------------------------------

--
-- Table structure for table `collections`
--

CREATE TABLE `collections` (
  `id` varchar(50) NOT NULL,
  `user_ID` varchar(50) NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `img` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `collection_details`
--

CREATE TABLE `collection_details` (
  `id` varchar(50) NOT NULL,
  `collection_ID` varchar(50) NOT NULL,
  `book_ID` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `conversations`
--

CREATE TABLE `conversations` (
  `id` varchar(50) NOT NULL,
  `user_IDs` longtext NOT NULL CHECK (json_valid(`user_IDs`)),
  `name` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `feedbacks`
--

CREATE TABLE `feedbacks` (
  `id` varchar(50) NOT NULL,
  `book_ID` varchar(50) NOT NULL,
  `user_ID` varchar(50) NOT NULL,
  `content` text NOT NULL,
  `star` tinyint(4) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` varchar(50) NOT NULL,
  `sender_ID` varchar(50) NOT NULL,
  `conversation_ID` varchar(50) NOT NULL,
  `content` text NOT NULL,
  `type` varchar(5) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

CREATE TABLE `order_details` (
  `id` varchar(50) NOT NULL,
  `user_ID` varchar(50) NOT NULL,
  `payment_ID` varchar(50) DEFAULT NULL,
  `total` int(11) NOT NULL,
  `voucher_ID` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_details`
--

INSERT INTO `order_details` (`id`, `user_ID`, `payment_ID`, `total`, `voucher_ID`, `created_at`, `modified_at`, `deleted_at`) VALUES
('a696afe0-f1d7-11ee-8226-4b9f959d3b35', 'user0001', 'c70dd9c0-fb3b-11ee-83dd-9d29c2525e70', 88000, NULL, '2024-04-03 16:31:41', NULL, NULL),
('af7aad50-f970-11ee-bbdc-37eca1ac982d', 'user0001', NULL, 88000, NULL, '2024-04-13 08:34:47', NULL, NULL),
('b9931350-fb3b-11ee-83dd-9d29c2525e70', 'user0001', NULL, 88000, NULL, '2024-04-15 15:20:43', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` varchar(50) NOT NULL,
  `order_ID` varchar(50) NOT NULL,
  `book_ID` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_ID`, `book_ID`, `created_at`, `modified_at`, `deleted_at`) VALUES
('a6a4e0b0-f1d7-11ee-8226-4b9f959d3b35', 'a696afe0-f1d7-11ee-8226-4b9f959d3b35', '0e5ddd79-cf37-119f-b954-f275088ab371', '2024-04-03 16:31:41', NULL, NULL),
('a6d4ca50-f1d7-11ee-8226-4b9f959d3b35', 'a696afe0-f1d7-11ee-8226-4b9f959d3b35', '3495edd0-cb2a-11ee-82bd-edb53285d63b', '2024-04-03 16:31:41', NULL, NULL),
('af81b230-f970-11ee-bbdc-37eca1ac982d', 'af7aad50-f970-11ee-bbdc-37eca1ac982d', '0e5ddd79-cf37-119f-b954-f275088ab371', '2024-04-13 08:34:47', NULL, NULL),
('af85f7f0-f970-11ee-bbdc-37eca1ac982d', 'af7aad50-f970-11ee-bbdc-37eca1ac982d', '3495edd0-cb2a-11ee-82bd-edb53285d63b', '2024-04-13 08:34:47', NULL, NULL),
('b99becf0-fb3b-11ee-83dd-9d29c2525e70', 'b9931350-fb3b-11ee-83dd-9d29c2525e70', '0e5ddd79-cf37-119f-b954-f275088ab371', '2024-04-15 15:20:43', NULL, NULL),
('b9a25590-fb3b-11ee-83dd-9d29c2525e70', 'b9931350-fb3b-11ee-83dd-9d29c2525e70', '3495edd0-cb2a-11ee-82bd-edb53285d63b', '2024-04-15 15:20:43', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `otp_collection`
--

CREATE TABLE `otp_collection` (
  `otp_token` varchar(6) NOT NULL,
  `otp_email` varchar(50) NOT NULL,
  `otp_status` enum('pending','active','block') NOT NULL DEFAULT 'pending',
  `expired_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `otp_collection`
--

INSERT INTO `otp_collection` (`otp_token`, `otp_email`, `otp_status`, `expired_at`) VALUES
('28207', 'nguoidunghangngay@example.com', 'pending', '2025-11-29 08:12:46');

-- --------------------------------------------------------

--
-- Table structure for table `payment_details`
--

CREATE TABLE `payment_details` (
  `id` varchar(50) NOT NULL,
  `order_ID` varchar(50) NOT NULL,
  `amount` int(11) DEFAULT NULL,
  `provider` varchar(20) NOT NULL,
  `status` smallint(6) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payment_details`
--

INSERT INTO `payment_details` (`id`, `order_ID`, `amount`, `provider`, `status`, `created_at`, `modified_at`, `deleted_at`) VALUES
('a8941aa0-f1e4-11ee-843d-937516bfbc8c', 'a696afe0-f1d7-11ee-8226-4b9f959d3b35', 88000, 'paypal', 0, '2024-04-03 18:04:47', NULL, NULL),
('c70dd9c0-fb3b-11ee-83dd-9d29c2525e70', 'a696afe0-f1d7-11ee-8226-4b9f959d3b35', 88000, 'paypal', 0, '2024-04-15 15:21:05', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` varchar(50) NOT NULL,
  `slug` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `group_key` varchar(50) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `slug`, `name`, `group_key`, `description`) VALUES
('perm_profile_edit', 'user.update_profile', 'Sửa thông tin cá nhân', 'User', 'Sửa họ tên, ngày sinh của chính mình'),
('perm_profile_view', 'user.view_profile', 'Xem thông tin cá nhân', 'User', 'Chỉ xem được thông tin của chính mình'),
('perm_role_manage', 'user.manage_roles', 'Thay đổi quyền user', 'System', 'Quyền set role cho người khác'),
('perm_sys_full', 'system.full', 'Toàn quyền hệ thống', 'System', 'Quyền truy cập tất cả mọi thứ (Super Admin)');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `description`) VALUES
('default_user', 'Default User', 'Người dùng mặc định, quyền hạn hạn chế'),
('super_admin', 'Super Administrator', 'Quản trị viên cấp cao nhất');

-- --------------------------------------------------------

--
-- Table structure for table `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `role_ID` varchar(50) NOT NULL,
  `permission_ID` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `role_has_permissions`
--

INSERT INTO `role_has_permissions` (`role_ID`, `permission_ID`) VALUES
('default_user', 'perm_profile_edit'),
('default_user', 'perm_profile_view'),
('super_admin', 'perm_role_manage'),
('super_admin', 'perm_sys_full');

-- --------------------------------------------------------

--
-- Table structure for table `shoping_sessions`
--

CREATE TABLE `shoping_sessions` (
  `id` varchar(50) NOT NULL,
  `user_ID` varchar(50) NOT NULL,
  `total` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shoping_sessions`
--

INSERT INTO `shoping_sessions` (`id`, `user_ID`, `total`, `created_at`) VALUES
('f585eb9f-97c1-1132-be0c-5be18fa540b9', 'user0001', 292000, '2024-04-03 07:52:51');

-- --------------------------------------------------------

--
-- Table structure for table `templates`
--

CREATE TABLE `templates` (
  `tem_name` varchar(50) NOT NULL,
  `tem_html` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tokens`
--

CREATE TABLE `tokens` (
  `id` varchar(50) NOT NULL,
  `user_ID` varchar(50) NOT NULL,
  `refresh_token` text NOT NULL,
  `enable` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tokens`
--

INSERT INTO `tokens` (`id`, `user_ID`, `refresh_token`, `enable`) VALUES
('cebc63b0-fd5e-11ee-9ceb-e938613f8b69', 'user0001', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXIwMDAxIiwiaWF0IjoxNzEzNDI5NDEzLCJleHAiOjE3MTQzMjk0MTN9.dumcYPZMgD11KAHOXYkPr5M8bVL4IeZYYEAISYlH270', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(50) NOT NULL,
  `first_name` varchar(20) DEFAULT NULL,
  `last_name` varchar(20) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `phone_number` varchar(12) DEFAULT NULL,
  `password` text DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `enable` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `phone_number`, `password`, `birthday`, `enable`, `created_at`, `modified_at`, `deleted_at`) VALUES
('c7289ead-a6cf-46ca-bcaa-e4b2018f7169', 'Super', 'Admin', 'admin@example.com', NULL, '$2b$10$/5WZ9xdW1ZbrFZD8/lDxOupjB3R.vGM/THrNTHHQznS3HW3w4NCGC', NULL, 1, '2025-11-29 08:58:29', NULL, NULL),
('user0001', NULL, NULL, 'admin', '01234456666', 'bbb59da3af939f7af5f360f2ceb80a496e3bae1cd87dde426db0ae40677e1c2c', NULL, 1, '2024-02-06 22:36:23', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_has_roles`
--

CREATE TABLE `user_has_roles` (
  `id` varchar(50) NOT NULL,
  `user_ID` varchar(50) NOT NULL,
  `role_ID` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_has_roles`
--

INSERT INTO `user_has_roles` (`id`, `user_ID`, `role_ID`, `created_at`) VALUES
('9328ee80-cd01-11f0-b8f4-edd8cbe1db95', 'c7289ead-a6cf-46ca-bcaa-e4b2018f7169', 'default_user', '2025-11-29 08:58:29'),
('super_id', 'user0001', 'super_admin', '2025-11-29 08:55:33');

-- --------------------------------------------------------

--
-- Table structure for table `user_payments`
--

CREATE TABLE `user_payments` (
  `id` varchar(50) NOT NULL,
  `user_ID` varchar(50) NOT NULL,
  `payment_type` varchar(30) NOT NULL,
  `provider` varchar(30) NOT NULL,
  `account_no` int(11) NOT NULL,
  `expiri_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vouchers`
--

CREATE TABLE `vouchers` (
  `id` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `code` varchar(10) NOT NULL,
  `discount` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `foreign_key_constraints_BOOKS_CATEGORYS` (`category_ID`),
  ADD KEY `foreign_key_constraints_BOOKS_AUTHORS` (`author_ID`);

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `foreign_key_constraints_CART_ITEMS_SESSION` (`session_ID`),
  ADD KEY `foreign_key_constraints_CART_ITEMS_BOOKS` (`book_ID`);

--
-- Indexes for table `categorys`
--
ALTER TABLE `categorys`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `collections`
--
ALTER TABLE `collections`
  ADD PRIMARY KEY (`id`),
  ADD KEY `foreign_key_constraints_COLLECTIONS_USERS` (`user_ID`);

--
-- Indexes for table `collection_details`
--
ALTER TABLE `collection_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `foreign_key_constraints_COLLECTIONDETAILS_BOOKS` (`book_ID`),
  ADD KEY `foreign_key_constraints_COLLECTIONDETAILS_COLLECTIONS` (`collection_ID`);

--
-- Indexes for table `conversations`
--
ALTER TABLE `conversations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feedbacks`
--
ALTER TABLE `feedbacks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `foreign_key_constraints_FEEDBACKS_USERS` (`user_ID`),
  ADD KEY `foreign_key_constraints_FEEDBACKS_BOOKS` (`book_ID`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `foreign_key_constraints_MESSAGES_CONVERSATIONS` (`conversation_ID`);

--
-- Indexes for table `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `foreign_key_constraints_ORDERDETAILS_VOUCHERS` (`voucher_ID`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `foreign_key_constraints_ORDER_ITEMS_ORDER_DETAILS` (`order_ID`);

--
-- Indexes for table `otp_collection`
--
ALTER TABLE `otp_collection`
  ADD PRIMARY KEY (`otp_email`);

--
-- Indexes for table `payment_details`
--
ALTER TABLE `payment_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `foreign_key_constraints_PAYMENT_DETAILS_ORDER_DETAILS` (`order_ID`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_slug` (`slug`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`role_ID`,`permission_ID`),
  ADD KEY `fk_rhp_perm` (`permission_ID`);

--
-- Indexes for table `shoping_sessions`
--
ALTER TABLE `shoping_sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `foreign_key_constraints_SHOPING_SESSIONS_USERS` (`user_ID`);

--
-- Indexes for table `templates`
--
ALTER TABLE `templates`
  ADD PRIMARY KEY (`tem_name`);

--
-- Indexes for table `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `foreign_key_constraints_TOKENS_USERS` (`user_ID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone_number` (`phone_number`);

--
-- Indexes for table `user_has_roles`
--
ALTER TABLE `user_has_roles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_uhr_user` (`user_ID`),
  ADD KEY `fk_uhr_role` (`role_ID`);

--
-- Indexes for table `user_payments`
--
ALTER TABLE `user_payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `foreign_key_constraints_USER_PAYMENT_USERS` (`user_ID`);

--
-- Indexes for table `vouchers`
--
ALTER TABLE `vouchers`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `foreign_key_constraints_BOOKS_AUTHORS` FOREIGN KEY (`author_ID`) REFERENCES `authors` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `foreign_key_constraints_BOOKS_CATEGORYS` FOREIGN KEY (`category_ID`) REFERENCES `categorys` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `foreign_key_constraints_CART_ITEMS_BOOKS` FOREIGN KEY (`book_ID`) REFERENCES `books` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `foreign_key_constraints_CART_ITEMS_SESSION` FOREIGN KEY (`session_ID`) REFERENCES `shoping_sessions` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `collections`
--
ALTER TABLE `collections`
  ADD CONSTRAINT `foreign_key_constraints_COLLECTIONS_USERS` FOREIGN KEY (`user_ID`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `collection_details`
--
ALTER TABLE `collection_details`
  ADD CONSTRAINT `foreign_key_constraints_COLLECTIONDETAILS_BOOKS` FOREIGN KEY (`book_ID`) REFERENCES `books` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `foreign_key_constraints_COLLECTIONDETAILS_COLLECTIONS` FOREIGN KEY (`collection_ID`) REFERENCES `collections` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `feedbacks`
--
ALTER TABLE `feedbacks`
  ADD CONSTRAINT `foreign_key_constraints_FEEDBACKS_BOOKS` FOREIGN KEY (`book_ID`) REFERENCES `books` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `foreign_key_constraints_FEEDBACKS_USERS` FOREIGN KEY (`user_ID`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `foreign_key_constraints_MESSAGES_CONVERSATIONS` FOREIGN KEY (`conversation_ID`) REFERENCES `conversations` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `foreign_key_constraints_ORDERDETAILS_VOUCHERS` FOREIGN KEY (`voucher_ID`) REFERENCES `vouchers` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `foreign_key_constraints_ORDER_ITEMS_ORDER_DETAILS` FOREIGN KEY (`order_ID`) REFERENCES `order_details` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `payment_details`
--
ALTER TABLE `payment_details`
  ADD CONSTRAINT `foreign_key_constraints_PAYMENT_DETAILS_ORDER_DETAILS` FOREIGN KEY (`order_ID`) REFERENCES `order_details` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `fk_rhp_perm` FOREIGN KEY (`permission_ID`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_rhp_role` FOREIGN KEY (`role_ID`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `shoping_sessions`
--
ALTER TABLE `shoping_sessions`
  ADD CONSTRAINT `foreign_key_constraints_SHOPING_SESSIONS_USERS` FOREIGN KEY (`user_ID`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `tokens`
--
ALTER TABLE `tokens`
  ADD CONSTRAINT `foreign_key_constraints_TOKENS_USERS` FOREIGN KEY (`user_ID`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `user_has_roles`
--
ALTER TABLE `user_has_roles`
  ADD CONSTRAINT `fk_uhr_role` FOREIGN KEY (`role_ID`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_uhr_user` FOREIGN KEY (`user_ID`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_payments`
--
ALTER TABLE `user_payments`
  ADD CONSTRAINT `foreign_key_constraints_USER_PAYMENT_USERS` FOREIGN KEY (`user_ID`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
