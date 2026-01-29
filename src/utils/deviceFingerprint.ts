/**
 * 设备指纹生成工具
 * 用于生成相对稳定的设备标识
 */

export function generateDeviceFingerprint(): string {
  if (typeof window === 'undefined') {
    return '';
  }

  const components: string[] = [];

  // 1. User Agent
  components.push(navigator.userAgent);

  // 2. 屏幕分辨率
  components.push(`${screen.width}x${screen.height}x${screen.colorDepth}`);

  // 3. 时区
  components.push(Intl.DateTimeFormat().resolvedOptions().timeZone);

  // 4. 语言
  components.push(navigator.language);

  // 5. 平台
  components.push(navigator.platform);

  // 6. 硬件并发数
  components.push(String(navigator.hardwareConcurrency || 0));

  // 7. 设备内存（如果可用）
  const deviceMemory = (navigator as { deviceMemory?: number }).deviceMemory;
  if (deviceMemory) {
    components.push(String(deviceMemory));
  }

  // 8. Canvas指纹
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      canvas.width = 200;
      canvas.height = 50;
      ctx.textBaseline = 'top';
      ctx.font = '14px Arial';
      ctx.fillStyle = '#f60';
      ctx.fillRect(125, 1, 62, 20);
      ctx.fillStyle = '#069';
      ctx.fillText('Cosmetics Quiz', 2, 15);
      ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
      ctx.fillText('Cosmetics Quiz', 4, 17);
      components.push(canvas.toDataURL());
    }
  } catch {
    // Canvas指纹生成失败，跳过
  }

  // 组合所有组件并生成哈希
  const fingerprint = components.join('|||');
  return simpleHash(fingerprint);
}

/**
 * 简单的哈希函数
 */
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
}

/**
 * 验证兑换码
 */
export function validateActivationCode(code: string): boolean {
  // 固定的兑换码
  const VALID_CODE = '9527';
  return code.trim().toUpperCase() === VALID_CODE;
}

/**
 * 检查设备是否已激活
 */
export function isDeviceActivated(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const stored = localStorage.getItem('cosmetics_activation');
    if (!stored) {
      return false;
    }

    const data = JSON.parse(stored);
    const currentFingerprint = generateDeviceFingerprint();

    // 验证设备指纹是否匹配
    return data.fingerprint === currentFingerprint && data.activated === true;
  } catch {
    return false;
  }
}

/**
 * 激活设备
 */
export function activateDevice(code: string): boolean {
  if (!validateActivationCode(code)) {
    return false;
  }

  try {
    const fingerprint = generateDeviceFingerprint();
    const activationData = {
      fingerprint,
      activated: true,
      activatedAt: new Date().toISOString(),
      code: code.trim().toUpperCase()
    };

    localStorage.setItem('cosmetics_activation', JSON.stringify(activationData));
    return true;
  } catch {
    return false;
  }
}

/**
 * 清除激活状态（用于测试）
 */
export function clearActivation(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('cosmetics_activation');
  }
}
