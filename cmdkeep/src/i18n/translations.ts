export type Language = 'zh' | 'en';

export const translations = {
  zh: {
    // Header
    appTitle: 'CmdKeep',
    appSubtitle: '命令速记工具',
    addCommand: '添加命令',
    searchPlaceholder: '搜索命令、标题或说明...',

    // Sidebar
    categories: '分类',
    allCategories: '全部',

    // Command Item
    copy: '复制命令',
    copied: '已复制',
    edit: '编辑',
    delete: '删除',
    addedJustNow: '刚刚添加',
    addedMinutesAgo: '分钟前添加',
    addedHoursAgo: '小时前添加',
    addedDaysAgo: '天前添加',
    addedWeeksAgo: '周前添加',
    addedMonthsAgo: '个月前添加',
    added: '添加于',

    // Modal
    addCommandTitle: '添加命令',
    editCommandTitle: '编辑命令',
    commandTitle: '标题',
    commandCategory: '分类',
    commandCommand: '命令',
    commandDescription: '说明（可选）',
    cancel: '取消',
    save: '保存',

    // Empty State
    noCommands: '暂无命令',
    addFirstCommand: '点击右上角按钮添加第一条命令',

    // Confirm
    confirmDelete: '确定要删除这条命令吗?',
    saveFailed: '保存失败：',

    // Settings
    settings: '设置',
    language: '语言',
    chinese: '中文',
    english: 'English',
  },
  en: {
    // Header
    appTitle: 'CmdKeep',
    appSubtitle: 'Command Quick Notes',
    addCommand: 'Add Command',
    searchPlaceholder: 'Search commands, title or description...',

    // Sidebar
    categories: 'Categories',
    allCategories: 'All',

    // Command Item
    copy: 'Copy Command',
    copied: 'Copied',
    edit: 'Edit',
    delete: 'Delete',
    addedJustNow: 'Added just now',
    addedMinutesAgo: 'minute(s) ago',
    addedHoursAgo: 'hour(s) ago',
    addedDaysAgo: 'day(s) ago',
    addedWeeksAgo: 'week(s) ago',
    addedMonthsAgo: 'month(s) ago',
    added: 'Added',

    // Modal
    addCommandTitle: 'Add Command',
    editCommandTitle: 'Edit Command',
    commandTitle: 'Title',
    commandCategory: 'Category',
    commandCommand: 'Command',
    commandDescription: 'Description (Optional)',
    cancel: 'Cancel',
    save: 'Save',

    // Empty State
    noCommands: 'No Commands',
    addFirstCommand: 'Click the button in the top right to add your first command',

    // Confirm
    confirmDelete: 'Are you sure you want to delete this command?',
    saveFailed: 'Save failed: ',

    // Settings
    settings: 'Settings',
    language: 'Language',
    chinese: '中文',
    english: 'English',
  },
};

export type TranslationKey = keyof typeof translations.zh;
