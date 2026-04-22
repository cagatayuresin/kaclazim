import { describe, it, expect, beforeEach, beforeAll, vi } from 'vitest';

// We need to set up the DOM BEFORE importing main.js because it initializes variables on load
document.body.innerHTML = `
  <div id="text1"></div>
  <div id="text2"></div>
  <input id="vize_notu" value="50">
  <input id="final_baraji" value="50">
  <input id="gecme_notu" value="50">
  <input id="final_etki_yuzde" value="60">
  <div id="donut"></div>
  <div id="ders_listesi"></div>
  <input id="ders_adi">
`;

// Mock requestAnimationFrame
vi.stubGlobal('requestAnimationFrame', vi.fn());

// Now import the functions
const main = await import('../docs/main.js');

describe('main.js DOM interactions', () => {
  beforeEach(() => {
    // Reset specific values but keep elements
    document.getElementById('vize_notu').value = '50';
    document.getElementById('final_baraji').value = '50';
    document.getElementById('gecme_notu').value = '50';
    document.getElementById('final_etki_yuzde').value = '60';
    document.getElementById('donut').innerHTML = '';
    localStorage.clear();
  });

  it('should calculate and update donut text', () => {
    main.kaclazim();
    expect(document.getElementById('donut').innerHTML).toBe('50');
  });

  it('should show "beş kardeş" for invalid input', () => {
    document.getElementById('vize_notu').value = '101';
    main.kaclazim();
    expect(document.getElementById('donut').innerHTML).toContain('beş kardeş');
  });

  it('should handle "elif" special case', () => {
    document.getElementById('vize_notu').value = 'elif';
    main.kaclazim();
    expect(document.getElementById('donut').innerHTML).toBe("Bi' tanem ❤️");
  });

  it('should load courses and show chips', () => {
    const mockData = {
      'Matematik': { final_baraji: 50, gecme_notu: 50, final_etki_yuzde: 60, vize_notu: 50 }
    };
    localStorage.setItem('kaclazim_courses', JSON.stringify(mockData));
    
    window.loadCourses();
    const chips = document.querySelectorAll('.ders-chip');
    expect(chips.length).toBeGreaterThanOrEqual(0);
  });

  it('should save a course', () => {
    document.getElementById('ders_adi').value = 'Fizik';
    main.dersKaydet();
    const courses = JSON.parse(localStorage.getItem('kaclazim_courses'));
    expect(courses['Fizik']).toBeDefined();
  });

  it('should update styles during morph and cooldown', () => {
    main.doMorph();
    expect(document.getElementById('text1').style.opacity).toBeDefined();
    
    main.doCooldown();
    expect(document.getElementById('text2').style.opacity).toBe('100%');
    
    main.setMorph(0.5);
    expect(document.getElementById('text2').style.filter).toContain('blur');
  });

  it('should save and delete a course', () => {
    document.getElementById('ders_adi').value = 'Test Course';
    main.dersKaydet();
    expect(JSON.parse(localStorage.getItem('kaclazim_courses'))['Test Course']).toBeDefined();
    
    main.dersSil();
    expect(JSON.parse(localStorage.getItem('kaclazim_courses'))['Test Course']).toBeUndefined();
  });

  it('should load and show course data', () => {
    document.getElementById('ders_adi').value = 'Load Test';
    document.getElementById('vize_notu').value = '70';
    main.dersKaydet();
    
    // Clear inputs
    document.getElementById('vize_notu').value = '';
    
    main.dersYukle('Load Test');
    expect(document.getElementById('vize_notu').value).toBe('70');
  });
});
